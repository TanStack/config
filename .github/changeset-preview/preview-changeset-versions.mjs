#!/usr/bin/env node

/**
 * Uses `@changesets/get-release-plan` to get the version bumps and formats it as markdown.
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseArgs } from 'node:util'
import getReleasePlan from '@changesets/get-release-plan'

const GITHUB_WORKSPACE = resolve(
  process.env.CHANGESET_WORKSPACE || process.env.GITHUB_WORKSPACE,
)

console.log(`Using workspace: ${GITHUB_WORKSPACE}`)

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
