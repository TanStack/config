// @ts-check

import { fileURLToPath } from 'node:url'

/**
 * @type {import('./packages/config/src/publish/index.js').Options["packages"]}
 */
export const packages = [
  {
    name: '@tanstack/config',
    packageDir: 'packages/config',
  },
]

/**
 * @type {import('./packages/config/src/publish/index.js').Options["branchConfigs"]}
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
 * @type {import('./packages/config/src/publish/index.js').Options["rootDir"]}
 */
export const rootDir = fileURLToPath(new URL('.', import.meta.url))
