// @ts-check

import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * List your npm packages here. The first package will be used as the versioner.
 * @type {import('./types').Package[]}
 */
export const packages = [
  {
    name: '@tanstack/config',
    packageDir: 'packages/form-core',
  },
]

/**
 * Contains config for publishable branches.
 * @type {Record<string, import('./types').BranchConfig>}
 */
export const branchConfigs = {
  main: {
    prerelease: false,
  },
  next: {
    prerelease: true,
  },
  beta: {
    prerelease: true,
  },
  alpha: {
    prerelease: true,
  },
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))
export const rootDir = resolve(__dirname, '..')
