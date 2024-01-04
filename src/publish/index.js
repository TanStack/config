// @ts-check
// Originally ported to TS from https://github.com/remix-run/react-router/tree/main/scripts/{version,publish}.js

import path from 'node:path'
import { execSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import chalk from 'chalk'
import jsonfile from 'jsonfile'
import * as semver from 'semver'
import currentGitBranch from 'current-git-branch'
import { parse as parseCommit } from '@commitlint/parse'
import log from 'git-log-parser'
import streamToArray from 'stream-to-array'
import { DateTime } from 'luxon'

/** @param {string} version */
const releaseCommitMsg = (version) => `release: v${version}`

/** @param {string} str */
function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

/**
 * @param {string} pathName
 * @returns {Promise<import('type-fest').PackageJson>}
 */
async function readPackageJson(pathName) {
  return await jsonfile.readFile(pathName)
}

/**
 * @param {string} pathName
 * @param {(json: import('type-fest').PackageJson) => Promise<void> | void} transform
 */
async function updatePackageJson(pathName, transform) {
  const json = await readPackageJson(pathName)
  await transform(json)
  await jsonfile.writeFile(pathName, json, {
    spaces: 2,
  })
}

/**
 * @template TItem
 * @param {((d: TItem) => any)[]} sorters
 * @returns {(a: TItem, b: TItem) => number}
 */
function getSorterFn(sorters) {
  return (a, b) => {
    let i = 0

    sorters.some((sorter) => {
      const sortedA = sorter(a)
      const sortedB = sorter(b)
      if (sortedA > sortedB) {
        i = 1
        return true
      }
      if (sortedA < sortedB) {
        i = -1
        return true
      }
      return false
    })

    return i
  }
}

/**
 * Execute a script being published
 * @param {import('./types.js').RunOptions} options
 * @returns {Promise<void>}
 */
export async function publish(options) {
  const { branchConfigs, packages, rootDir, branch, tag, ghToken } = options
  const branchName = /** @type {string} */ (branch ?? currentGitBranch())
  /** @type {import('./types.js').BranchConfig | undefined} */
  const branchConfig = branchConfigs[branchName]

  const isMainBranch = branchName === 'main'
  const isPreviousRelease = branchConfig?.previousVersion
  const npmTag = isMainBranch ? 'latest' : branchName

  // Get tags
  /** @type {string[]} */
  let tags = execSync('git tag').toString().split('\n')

  // Filter tags to our branch/pre-release combo
  tags = tags
    .filter((t) => semver.valid(t))
    .filter((t) => {
      // If this is an older release, filter to only include that version
      if (isPreviousRelease) {
        return t.startsWith(branchName)
      }
      if (semver.prerelease(t) === null) {
        return isMainBranch
      } else {
        return !isMainBranch
      }
    })
    // sort by latest
    .sort(semver.compare)

  // Get the latest tag
  let latestTag = /** @type {string} */ ([...tags].pop())

  let range = `${latestTag}..HEAD`
  // let range = ``;

  // If RELEASE_ALL is set via a commit subject or body, all packages will be
  // released regardless if they have changed files matching the package srcDir.
  let RELEASE_ALL = false

  if (!latestTag || tag) {
    if (tag) {
      if (!tag.startsWith('v')) {
        throw new Error(
          `tag must start with "v", eg. v0.0.0. You supplied ${tag}`,
        )
      }
      console.info(
        chalk.yellow(
          `Tag is set to ${tag}. This will force release all packages. Publishing...`,
        ),
      )
      RELEASE_ALL = true

      // Is it the first release? Is it a major version?
      if (!latestTag || (!semver.patch(tag) && !semver.minor(tag))) {
        range = `origin/main..HEAD`
        latestTag = tag
      }
    } else {
      throw new Error(
        'Could not find latest tag! To make a release tag of v0.0.1, run with TAG=v0.0.1',
      )
    }
  }

  console.info(`Git Range: ${range}`)

  /**
   * Get the commits since the latest tag
   * @type {import('./types.js').Commit[]}
   */
  const commitsSinceLatestTag = (
    await new Promise((resolve, reject) => {
      /** @type {NodeJS.ReadableStream} */
      const strm = log.parse({
        _: range,
      })

      streamToArray(strm, function (err, arr) {
        if (err) return reject(err)

        Promise.all(
          arr.map(async (d) => {
            const parsed = await parseCommit(d.subject)

            return { ...d, parsed }
          }),
        ).then((res) => resolve(res.filter(Boolean)))
      })
    })
  ).filter((/** @type {import('./types.js').Commit} */ commit) => {
    const exclude = [
      commit.subject.startsWith('Merge branch '), // No merge commits
      commit.subject.startsWith(releaseCommitMsg('')), // No example update commits
    ].some(Boolean)

    return !exclude
  })

  console.info(
    `Parsing ${commitsSinceLatestTag.length} commits since ${latestTag}...`,
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
      if (commit.parsed.type) {
        if (['fix', 'refactor', 'perf'].includes(commit.parsed.type)) {
          releaseLevel = Math.max(releaseLevel, 0)
        }
        if (['feat'].includes(commit.parsed.type)) {
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
  // changes to query-core affect query-persist-client-core, which affects react-query-persist-client and then indirectly the sync/async persisters
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
        console.info(
          'adding package dependency',
          pkg.name,
          'to changed packages',
        )
        changedPackages.push(pkg)
      }
    }
  }

  if (!tag) {
    if (recommendedReleaseLevel === 2) {
      console.info(
        `Major versions releases must be tagged and released manually.`,
      )
      return
    }

    if (recommendedReleaseLevel === -1) {
      console.info(
        `There have been no changes since the release of ${latestTag} that require a new version. You're good!`,
      )
      return
    }
  }

  const changelogCommitsMd = tag
    ? `Manual Release: ${tag}`
    : await Promise.all(
        Object.entries(
          commitsSinceLatestTag.reduce((acc, next) => {
            const type = next.parsed.type?.toLowerCase() ?? 'other'

            return {
              ...acc,
              [type]: [...(acc[type] || []), next],
            }
          }, /** @type {Record<string, import('./types.js').Commit[]>} */ ({})),
        )
          .sort(
            getSorterFn([
              ([d]) =>
                [
                  'other',
                  'examples',
                  'docs',
                  'chore',
                  'refactor',
                  'perf',
                  'fix',
                  'feat',
                ].indexOf(d),
            ]),
          )
          .reverse()
          .map(async ([type, commits]) => {
            return Promise.all(
              commits.map(async (commit) => {
                let username = ''

                if (ghToken) {
                  const query = `${
                    commit.author.email || commit.committer.email
                  }`

                  const res = await fetch(
                    `https://api.github.com/search/users?q=${query}`,
                    {
                      headers: {
                        Authorization: `token ${ghToken}`,
                      },
                    },
                  )
                  /** @type {any} */
                  const data = await res.json()
                  username = data.items[0]?.login
                }

                const scope = commit.parsed.scope
                  ? `${commit.parsed.scope}: `
                  : ''
                const subject = commit.parsed.subject || commit.subject

                return `- ${scope}${subject} (${commit.commit.short}) ${
                  username
                    ? `by @${username}`
                    : `by ${commit.author.name || commit.author.email}`
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

  if (tag && recommendedReleaseLevel === -1) {
    recommendedReleaseLevel = 0
  }

  if (!branchConfig) {
    console.log(`No publish config found for branch: ${branchName}`)
    console.log('Exiting...')
    process.exit(0)
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
      `Invalid version increment from semver.inc(${[
        latestTag,
        recommendedReleaseLevel,
        branchConfig.prerelease,
      ].join(', ')}`,
    )
  }

  const changelogMd = [
    `Version ${version} - ${DateTime.now().toLocaleString(
      DateTime.DATETIME_SHORT,
    )}`,
    `## Changes`,
    changelogCommitsMd,
    `## Packages`,
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
    console.info('Updating examples to use new package versions')
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
    for (const examplePkgJson of examplePkgJsonArray) {
      await updatePackageJson(
        path.resolve(rootDir, 'examples', examplePkgJson),
        (config) => {
          for (const pkg of changedPackages) {
            if (config.dependencies?.[pkg.name]) {
              config.dependencies[pkg.name] = `^${version}`
            }
          }
        },
      )
    }
  }

  if (!process.env.CI) {
    console.warn(
      `This is a dry run for version ${version}. Push to CI to publish for real or set CI=true to override!`,
    )
    return
  }

  console.info()
  console.info(`Publishing all packages to npm`)

  // Publish each package
  changedPackages.forEach((pkg) => {
    const packageDir = path.join(rootDir, pkg.packageDir)
    const tagParam = branchConfig.previousVersion ? `` : `--tag ${npmTag}`

    const cmd = `cd ${packageDir} && pnpm publish ${tagParam} --access=public --no-git-checks`
    console.info(`  Publishing ${pkg.name}@${version} to npm "${tagParam}"...`)
    execSync(cmd, {
      stdio: [process.stdin, process.stdout, process.stderr],
    })
  })

  console.info()

  console.info(`Committing changes...`)
  execSync(`git add -A && git commit -m "${releaseCommitMsg(version)}"`)
  console.info()
  console.info(`  Committed Changes.`)

  console.info(`Pushing changes...`)
  execSync(`git push`)
  console.info()
  console.info(`  Changes pushed.`)

  console.info(`Creating new git tag v${version}`)
  execSync(`git tag -a -m "v${version}" v${version}`)

  console.info(`Pushing tags...`)
  execSync(`git push --tags`)
  console.info()
  console.info(`  Tags pushed.`)

  if (ghToken) {
    console.info(`Creating github release...`)

    // Stringify the markdown to escape any quotes
    execSync(
      `gh release create v${version} ${
        branchConfig.prerelease ? '--prerelease' : ''
      } --notes '${changelogMd.replace(/'/g, '"')}'`,
      { env: { ...process.env, GH_TOKEN: ghToken } },
    )
    console.info(`  Github release created.`)
  }

  console.info(`All done!`)
}
