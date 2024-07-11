// @ts-check

import { resolve } from 'node:path'

/** @type {import('./packages/config/src/publish/types.js').RunOptions} */
const config = {
  packages: [
    {
      name: '@tanstack/config',
      packageDir: 'packages/config',
    },
  ],
  branchConfigs: {
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
  },
  rootDir: resolve(import.meta.dirname, '.'),
}

export default config
