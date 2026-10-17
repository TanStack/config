#!/usr/bin/env node

/**
 * Uses `@changesets/get-release-plan` to get the version bumps and formats it as markdown.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { parseArgs } from 'node:util'

const GITHUB_WORKSPACE = resolve(process.env.GITHUB_WORKSPACE)

console.log(`Using workspace: ${GITHUB_WORKSPACE}`)

/**
 * Release plan semantics differ between changesets majors (e.g. v2 bumps peer
 * dependents to major unless `onlyUpdatePeerDependentsWhenOutOfRange` is set,
 * v3 doesn't), so use the `get-release-plan` major that matches the
 * `@changesets/cli` the workspace actually releases with.
 */
const RELEASE_PLAN_BY_CLI_MAJOR = {
  2: 'get-release-plan-v4',
  3: 'get-release-plan-v5',
}
const DEFAULT_CLI_MAJOR = 3

function getChangesetsCliMajor() {
  try {
    const require = createRequire(join(GITHUB_WORKSPACE, 'package.json'))
    const pkgPath = require.resolve('@changesets/cli/package.json')
    const { version } = JSON.parse(readFileSync(pkgPath, 'utf8'))
    console.log(`Found @changesets/cli@${version}`)
    return Number(version.split('.')[0])
  } catch {
    console.warn(
      `Could not resolve @changesets/cli from workspace, assuming v${DEFAULT_CLI_MAJOR}`,
    )
    return DEFAULT_CLI_MAJOR
  }
}

async function loadGetReleasePlan() {
  const cliMajor = getChangesetsCliMajor()
  let pkg = RELEASE_PLAN_BY_CLI_MAJOR[cliMajor]
  if (!pkg) {
    console.warn(
      `Unsupported @changesets/cli major v${cliMajor}, falling back to v${DEFAULT_CLI_MAJOR}`,
    )
    pkg = RELEASE_PLAN_BY_CLI_MAJOR[DEFAULT_CLI_MAJOR]
  }
  console.log(`Using ${pkg}`)
  const { default: getReleasePlan } = await import(pkg)
  return getReleasePlan
}

function reasonRank(reason) {
  return reason === 'Changeset' ? 2 : 1
}

async function main() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      output: { type: 'string', short: 'o' },
    },
    strict: true,
    allowPositionals: false,
  })

  const getReleasePlan = await loadGetReleasePlan()
  const releasePlan = await getReleasePlan(GITHUB_WORKSPACE)
  const releases = releasePlan.releases

  if (releases.length === 0) {
    const msg =
      'No changeset entries found. Merging this PR will not cause a version bump for any packages.\n'
    process.stdout.write(msg)
    if (values.output) {
      writeFileSync(values.output, msg)
      process.stdout.write(`Written to ${values.output}\n`)
    }
    return
  }

  // 6. Diff
  const bumps = []
  for (const release of releases) {
    if (release.oldVersion === release.newVersion) continue
    const reason = release.changesets.length !== 0 ? 'Changeset' : 'Dependent'
    bumps.push({ ...release, reason })
  }

  // Order by reason and name
  bumps.sort(
    (a, b) =>
      reasonRank(b.reason) - reasonRank(a.reason) ||
      a.name.localeCompare(b.name),
  )

  // 7. Build markdown
  const lines = []

  if (bumps.length === 0) {
    lines.push(
      'No version changes detected. Merging this PR will not cause a version bump for any packages.',
    )
  } else {
    const majorBumps = bumps.filter((b) => b.type === 'major')
    const minorBumps = bumps.filter((b) => b.type === 'minor')
    const patchBumps = bumps.filter((b) => b.type === 'patch')
    const directBumps = bumps.filter((b) => b.reason === 'Changeset')
    const indirectBumps = bumps.filter((b) => b.reason === 'Dependent')

    lines.push(
      `**${directBumps.length}** package(s) bumped directly, **${indirectBumps.length}** bumped as dependents.`,
    )
    lines.push('')

    if (majorBumps.length > 0) {
      lines.push('### 🟥 Major bumps')
      lines.push('')
      lines.push('| Package | Version | Reason |')
      lines.push('| --- | --- | --- |')
      for (const b of majorBumps) {
        lines.push(
          `| \`${b.name}\` | ${b.oldVersion} → ${b.newVersion} | ${b.reason} |`,
        )
      }
      lines.push('')
    }

    if (minorBumps.length > 0) {
      lines.push('### 🟨 Minor bumps')
      lines.push('')
      lines.push('| Package | Version | Reason |')
      lines.push('| --- | --- | --- |')
      for (const b of minorBumps) {
        lines.push(
          `| \`${b.name}\` | ${b.oldVersion} → ${b.newVersion} | ${b.reason} |`,
        )
      }
      lines.push('')
    }

    if (patchBumps.length > 0) {
      lines.push('### 🟩 Patch bumps')
      lines.push('')
      lines.push('| Package | Version | Reason |')
      lines.push('| --- | --- | --- |')
      for (const b of patchBumps) {
        lines.push(
          `| \`${b.name}\` | ${b.oldVersion} → ${b.newVersion} | ${b.reason} |`,
        )
      }
    }
  }

  lines.push('')
  const md = lines.join('\n')

  process.stdout.write(md)
  if (values.output) {
    writeFileSync(values.output, md)
    process.stdout.write(`Written to ${values.output}\n`)
  }
}

main()
