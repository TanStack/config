// @ts-check

import { fileURLToPath } from 'node:url'

/**
 * @type {import('./src/publish/types.js').RunOptions["packages"]}
 */
export const packages = [
  {
    name: '@tanstack/config',
    packageDir: '',
  },
]

/**
 * @type {import('./src/publish/types.js').RunOptions["branchConfigs"]}
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

/**
 * @type {import('./src/publish/types.js').RunOptions["rootDir"]}
 */
export const rootDir = fileURLToPath(new URL('.', import.meta.url))
