// @ts-check
// Originally ported to TS from https://github.com/remix-run/react-router/tree/main/scripts/{version,publish}.js

import path from 'node:path'
import { execSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import * as semver from 'semver'
import currentGitBranch from 'current-git-branch'
import { parse as parseCommit } from '@commitlint/parse'
import { simpleGit } from 'simple-git'
import {
  capitalize,
  getSorterFn,
  readPackageJson,
  releaseCommitMsg,
  updatePackageJson,
} from './utils.js'

/**
 * Execute a script being published
 * @param {import('./index.js').Options} options
 * @returns {Promise<void>}
 */
export const publish = async (options) => {
  const { branchConfigs, packages, rootDir, branch, tag, ghToken } = options

  const branchName = /** @type {string} */ (branch ?? currentGitBranch())
  const isMainBranch = branchName === 'main'
  const npmTag = isMainBranch ? 'latest' : branchName

  /** @type {import('./index.js').BranchConfig | undefined} */
  const branchConfig = branchConfigs[branchName]

  if (!branchConfig) {
    throw new Error(`No publish config found for branch: ${branchName}`)
  }

  // Get tags
  /** @type {string[]} */
  const allTags = execSync('git tag').toString().split('\n')

  const filteredTags = allTags
    // Ensure tag is valid
    .filter((t) => semver.valid(t))
    // sort by latest
    .sort(semver.compare)
    // Filter tags to our branch/pre-release combo
    .filter((t) => {
      // If this is an older release, filter to only include that version
      if (branchConfig.previousVersion) {
        return t.startsWith(branchName)
      }
      if (semver.prerelease(t) === null) {
        return isMainBranch
      } else {
        return !isMainBranch
      }
    })

  // Get the latest tag
  let latestTag = filteredTags.at(-1)

  let rangeFrom = latestTag

  // If RELEASE_ALL is set via a commit subject or body, all packages will be
  // released regardless if they have changed files matching the package srcDir.
  let RELEASE_ALL = false

  // Validate manual tag
  if (tag) {
    if (!semver.valid(tag)) {
      throw new Error(`tag '${tag}' is not a semantically valid version`)
    }
    if (!tag.startsWith('v')) {
      throw new Error(
        `tag must start with "v" (e.g. v0.0.0). You supplied ${tag}`,
      )
    }
    if (allTags.includes(tag)) {
      throw new Error(`tag ${tag} has already been released`)
    }
  }

  if (!latestTag || tag) {
    if (tag) {
      console.info(
        `Tag is set to ${tag}. This will force release all packages. Publishing...`,
      )
      RELEASE_ALL = true

      // Is it the first release? Is it a major version?
      if (!latestTag || (semver.patch(tag) === 0 && semver.minor(tag) === 0)) {
        rangeFrom = 'origin/main'
        latestTag = tag
      }
    } else {
      throw new Error(
        'Could not find latest tag! To make a release tag of v0.0.1, run with TAG=v0.0.1',
      )
    }
  }

  console.info(`Git Range: ${rangeFrom}..HEAD`)

  const rawCommitsLog = (
    await simpleGit().log({ from: rangeFrom, to: 'HEAD' })
  ).all.filter((c) => {
    const exclude = [
      c.message.startsWith('Merge branch '), // No merge commits
      c.message.startsWith(releaseCommitMsg('')), // No example update commits
    ].some(Boolean)

    return !exclude
  })

  /**
   * Get the commits since the latest tag
   * @type {import('./index.js').Commit[]}
   */
  const commitsSinceLatestTag = await Promise.all(
    rawCommitsLog.map(async (c) => {
      const parsed = await parseCommit(c.message)
      return {
        hash: c.hash.substring(0, 7),
        body: c.body,
        subject: parsed.subject ?? '',
        author_name: c.author_name,
        author_email: c.author_email,
        type: parsed.type?.toLowerCase() ?? 'other',
        scope: parsed.scope,
      }
    }),
  )

  console.info(
    `Parsing ${commitsSinceLatestTag.length} commits since ${rangeFrom}...`,
  )

  /**
   * Parses the commit messsages, log them, and determine the type of release needed
   * -1 means no release is necessary
   * 0 means patch release is necessary
   * 1 means minor release is necessary
   * 2 means major release is necessary
   * @type {number}
   */
  let recommendedReleaseLevel = commitsSinceLatestTag.reduce(
    (releaseLevel, commit) => {
      if (commit.type) {
        if (['fix', 'refactor', 'perf'].includes(commit.type)) {
          releaseLevel = Math.max(releaseLevel, 0)
        }
        if (['feat'].includes(commit.type)) {
          releaseLevel = Math.max(releaseLevel, 1)
        }
        if (commit.body.includes('BREAKING CHANGE')) {
          releaseLevel = Math.max(releaseLevel, 2)
        }
        if (
          commit.subject.includes('RELEASE_ALL') ||
          commit.body.includes('RELEASE_ALL')
        ) {
          RELEASE_ALL = true
        }
      }
      return releaseLevel
    },
    -1,
  )

  // If there is a breaking change and no manual tag is set, do not release
  if (recommendedReleaseLevel === 2 && !tag) {
    throw new Error(
      'Major versions releases must be tagged and released manually.',
    )
  }

  // If no release is semantically necessary and no manual tag is set, do not release
  if (recommendedReleaseLevel === -1 && !tag) {
    console.info(
      `There have been no changes since ${latestTag} that require a new version. You're good!`,
    )
    return
  }

  // If no release is samantically necessary but a manual tag is set, do a patch release
  if (recommendedReleaseLevel === -1 && tag) {
    recommendedReleaseLevel = 0
  }

  const releaseType = branchConfig.prerelease
    ? 'prerelease'
    : /** @type {const} */ ({ 0: 'patch', 1: 'minor', 2: 'major' })[
        recommendedReleaseLevel
      ]

  if (!releaseType) {
    throw new Error(`Invalid release level: ${recommendedReleaseLevel}`)
  }

  const version = tag
    ? semver.parse(tag)?.version
    : semver.inc(latestTag, releaseType, npmTag)

  if (!version) {
    throw new Error(
      [
        'Invalid version increment from semver.inc()',
        `- latestTag: ${latestTag}`,
        `- recommendedReleaseLevel: ${recommendedReleaseLevel}`,
        `- prerelease: ${branchConfig.prerelease}`,
      ].join('\n'),
    )
  }

  console.log(`Targeting version ${version}...`)

  /**
   * Uses git diff to determine which files have changed since the latest tag
   * @type {string[]}
   */
  const changedFiles = tag
    ? []
    : execSync(`git diff ${latestTag} --name-only`)
        .toString()
        .split('\n')
        .filter(Boolean)

  /** Uses packages and changedFiles to determine which packages have changed */
  const changedPackages = RELEASE_ALL
    ? packages
    : packages.filter((pkg) => {
        const changed = changedFiles.some(
          (file) =>
            file.startsWith(path.join(pkg.packageDir, 'src')) ||
            file.startsWith(path.join(pkg.packageDir, 'package.json')),
        )
        return changed
      })

  // If a package has a dependency that has been updated, we need to update the
  // package that depends on it as well.
  // run this multiple times so that dependencies of dependencies are also included
  for (let runs = 0; runs < 3; runs++) {
    for (const pkg of packages) {
      const packageJson = await readPackageJson(
        path.resolve(rootDir, pkg.packageDir, 'package.json'),
      )
      const allDependencies = Object.keys(
        Object.assign(
          {},
          packageJson.dependencies ?? {},
          packageJson.peerDependencies ?? {},
        ),
      )

      if (
        allDependencies.find((dep) =>
          changedPackages.find((d) => d.name === dep),
        ) &&
        !changedPackages.find((d) => d.name === pkg.name)
      ) {
        console.info(`  Adding dependency ${pkg.name} to changed packages`)
        changedPackages.push(pkg)
      }
    }
  }

  const changelogCommitsMd = await Promise.all(
    Object.entries(
      commitsSinceLatestTag.reduce(
        (prev, curr) => {
          return {
            ...prev,
            [curr.type]: [...(prev[curr.type] ?? []), curr],
          }
        },
        /** @type {Record<string, import('./index.js').Commit[]>} */ ({}),
      ),
    )
      .sort(
        getSorterFn(([type]) =>
          [
            'other',
            'examples',
            'docs',
            'ci',
            'test',
            'chore',
            'refactor',
            'perf',
            'fix',
            'feat',
          ].indexOf(type),
        ),
      )
      .reverse()
      .map(async ([type, commits]) => {
        return Promise.all(
          commits.map(async (commit) => {
            let username = ''

            if (ghToken) {
              const query = commit.author_email

              const res = await fetch(
                `https://api.github.com/search/users?q=${query}`,
                {
                  headers: {
                    Authorization: `token ${ghToken}`,
                  },
                },
              )
              const data = /** @type {unknown} */ (await res.json())
              if (data && typeof data === 'object' && 'items' in data) {
                if (Array.isArray(data.items) && data.items[0]) {
                  const item = /** @type {object} */ (data.items[0])
                  if ('login' in item && typeof item.login === 'string') {
                    username = item.login
                  }
                }
              }
            }

            const scope = commit.scope ? `${commit.scope}: ` : ''
            const subject = commit.subject

            return `- ${scope}${subject} (${commit.hash}) ${
              username
                ? `by @${username}`
                : `by ${commit.author_name || commit.author_email}`
            }`
          }),
        ).then((c) => /** @type {const} */ ([type, c]))
      }),
  ).then((groups) => {
    return groups
      .map(([type, commits]) => {
        return [`### ${capitalize(type)}`, commits.join('\n')].join('\n\n')
      })
      .join('\n\n')
  })

  const date = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(Date.now())

  const changelogMd = [
    `Version ${version} - ${date}${tag ? ' (Manual Release)' : ''}`,
    '## Changes',
    changelogCommitsMd || '- None',
    '## Packages',
    changedPackages.map((d) => `- ${d.name}@${version}`).join('\n'),
  ].join('\n\n')

  console.info('Generating changelog...')
  console.info()
  console.info(changelogMd)
  console.info()

  if (changedPackages.length === 0) {
    console.info('No packages have been affected.')
    return
  }

  console.info(`Updating all changed packages to version ${version}...`)
  // Update each package to the new version
  for (const pkg of changedPackages) {
    console.info(`  Updating ${pkg.name} version to ${version}...`)

    await updatePackageJson(
      path.resolve(rootDir, pkg.packageDir, 'package.json'),
      (config) => {
        config.version = version
      },
    )
  }

  if (existsSync(path.resolve(rootDir, 'examples'))) {
    console.info('Updating examples to use new package versions...')
    const examplePkgJsonArray = /** @type {string[]} */ (
      readdirSync(path.resolve(rootDir, 'examples'), {
        recursive: true,
      }).filter(
        (file) =>
          typeof file === 'string' &&
          file.includes('package.json') &&
          !file.includes('node_modules'),
      )
    )
    if (examplePkgJsonArray.length !== 0) {
      for (const examplePkgJson of examplePkgJsonArray) {
        await updatePackageJson(
          path.resolve(rootDir, 'examples', examplePkgJson),
          (config) => {
            for (const pkg of changedPackages) {
              if (config.dependencies?.[pkg.name]) {
                config.dependencies[pkg.name] = `^${version}`
              }
              if (config.devDependencies?.[pkg.name]) {
                config.devDependencies[pkg.name] = `^${version}`
              }
            }
          },
        )
      }
      if (existsSync(path.resolve(rootDir, 'pnpm-lock.yaml'))) {
        console.info('  Updating pnpm-lock.yaml...')
        try {
          execSync('pnpm install --no-frozen-lockfile')
        } catch (/** @type {any} */ err) {
          throw new Error(err.stdout.toString())
        }
      }
    }
  }

  if (!process.env.CI) {
    console.warn(
      `This is a dry run for version ${version}. Push to CI to publish for real or set CI=true to override!`,
    )
    return
  }

  console.info()
  console.info('Committing changes...')
  execSync(`git add -A && git commit -m "${releaseCommitMsg(version)}"`)
  console.info('  Committed Changes.')

  console.info()
  console.info('Clear package scripts...')
  for (const pkg of changedPackages) {
    await updatePackageJson(
      path.resolve(rootDir, pkg.packageDir, 'package.json'),
      (config) => {
        config.scripts = {}
      },
    )
  }

  console.info()
  console.info(`Publishing all packages to npm with tag "${npmTag}"`)

  // Publish each package
  for (const pkg of changedPackages) {
    const packageDir = path.join(rootDir, pkg.packageDir)

    const cmd = `cd ${packageDir} && pnpm publish --tag ${npmTag} --access=public --no-git-checks`
    console.info(`  Publishing ${pkg.name}@${version} to npm...`)
    execSync(cmd, {
      stdio: [process.stdin, process.stdout, process.stderr],
    })
  }

  console.info()
  console.info('Pushing changes...')
  execSync('git push')
  console.info('  Changes pushed.')

  console.info()
  console.info(`Creating new git tag v${version}`)
  execSync(`git tag -a -m "v${version}" v${version}`)

  console.info()
  console.info('Pushing tags...')
  execSync('git push --tags')
  console.info('  Tags pushed.')

  if (ghToken) {
    console.info()
    console.info('Creating github release...')

    // Stringify the markdown to escape any quotes
    execSync(
      `gh release create v${version} ${
        branchConfig.prerelease ? '--prerelease' : ''
      } --notes '${changelogMd.replace(/'/g, '"')}'`,
      { env: { ...process.env, GH_TOKEN: ghToken } },
    )
    console.info('  Github release created.')
  }

  console.info()
  console.info('All done!')
}
