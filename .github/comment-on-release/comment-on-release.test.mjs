import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const script = fileURLToPath(
  new URL('./comment-on-release.ts', import.meta.url),
)
const releases = [
  ['1.0.0', '100'],
  ['1.0.0-rc.1.3', '100-rc13'],
  ['1.0.0-rc.1.4', '100-rc14'],
  ['1.0.0-rc.1.40', '100-rc140'],
  ['1.0.0-beta.1', '100-beta1'],
  ['1.0.0-rc.1.4+build.7', '100-rc14build7'],
  ['1.0.0+build.7', '100build7'],
  ['1.0.0+BUILD.7', '100build7'],
].map(([version, anchor], index) => ({ version, anchor, pr: 200 + index }))

function runAction(version) {
  const root = mkdtempSync(join(tmpdir(), 'release-comments-'))
  try {
    const bin = join(root, 'bin')
    const pkg = join(root, 'packages', 'db')
    const calls = join(root, 'calls.jsonl')
    mkdirSync(bin)
    mkdirSync(pkg, { recursive: true })
    writeFileSync(calls, '')
    writeFileSync(
      join(pkg, 'CHANGELOG.md'),
      '# @tanstack/db\n\n' +
        releases
          .map(
            ({ version: heading, pr }) =>
              `## ${heading}\n\n### Patch Changes\n\n- Fix ([#${pr}](https://github.com/TanStack/db/pull/${pr}))\n`,
          )
          .join('\n') +
        '\n## Archive\n\n[#999](https://github.com/TanStack/db/pull/999)\n',
    )
    // Execute the real action, but replace every GitHub operation with a local
    // recorder. The fixture links each PR to the issue numbered 1000 above it.
    writeFileSync(
      join(bin, 'gh'),
      `#!/usr/bin/env node
const { appendFileSync } = require('node:fs')
const args = process.argv.slice(2)
appendFileSync(process.env.RELEASE_COMMENT_CALLS, JSON.stringify(args) + '\\n')
if (args[0] === 'api' && args[1] === 'graphql') {
  console.log(Number(args.find(arg => arg.startsWith('pr=')).slice(3)) + 1000)
} else if (args[0] === 'api' && args[1].endsWith('/comments')) {
  console.log('0')
} else if ((args[0] === 'pr' || args[0] === 'issue') && args[1] === 'comment') {
  // Recorded above; no network operation.
} else {
  console.error('Unexpected gh call:', args)
  process.exit(1)
}
`,
      { mode: 0o755 },
    )
    const result = spawnSync(process.execPath, [script], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: [bin, process.env.PATH].join(delimiter),
        PUBLISHED_PACKAGES: JSON.stringify([{ name: '@tanstack/db', version }]),
        REPOSITORY: 'TanStack/db',
        GITHUB_REPOSITORY: 'TanStack/db',
        RELEASE_COMMENT_CALLS: calls,
      },
    })
    assert.equal(result.status, 0, result.stderr)
    return {
      output: result.stdout + result.stderr,
      calls: readFileSync(calls, 'utf8')
        .split('\n')
        .filter(Boolean)
        .map((line) => JSON.parse(line)),
    }
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

for (const { version, anchor, pr } of releases) {
  test(`comments only on the PR and linked issue in the exact ${version} section`, () => {
    const { calls } = runAction(version)
    const comments = calls.filter((args) => args[1] === 'comment')
    assert.deepEqual(
      comments.map((args) => args.slice(0, 3)),
      [
        ['pr', 'comment', String(pr)],
        ['issue', 'comment', String(pr + 1000)],
      ],
    )
    for (const args of comments) {
      assert.ok(args[4].includes(`@tanstack/db@${version}`))
      assert.ok(args[4].includes('has been released!'))
      assert.ok(args[4].includes(`/CHANGELOG.md#${anchor})`))
    }
  })
}

test('does not comment when the published version has no changelog section', () => {
  const { calls, output } = runAction('2.0.0-rc.1')
  assert.deepEqual(calls, [])
  assert.ok(output.includes('Could not find version 2.0.0-rc.1'))
})
