// @ts-check

import { fileURLToPath } from 'node:url'

/**
 * @type {import('./packages/config/src/publish/types.js').RunOptions["packages"]}
 */
export const packages = [
  {
    name: '@tanstack/config',
    packageDir: 'packages/config',
  },
]

/**
 * @type {import('./packages/config/src/publish/types.js').RunOptions["branchConfigs"]}
 */
export const branchConfigs = {
  main: {
    prerelease: false,
  },
  alpha: {
    prerelease: true,
  },
  beta: {
    prerelease: true,
  },
}

/**
 * @type {import('./packages/config/src/publish/types.js').RunOptions["rootDir"]}
 */
export const rootDir = fileURLToPath(new URL('.', import.meta.url))
