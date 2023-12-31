// @ts-check

import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * @type {import('../src/types.js').RunOptions["packages"]}
 */
export const packages = [
  {
    name: '@tanstack/config',
    packageDir: 'packages/form-core',
  },
]

/**
 * @type {import('../src/types.js').RunOptions["branchConfigs"]}
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

/**
 * @type {import('../src/types.js').RunOptions["rootDir"]}
 */
export const rootDir = resolve(__dirname, '..')
