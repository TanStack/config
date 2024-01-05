// @ts-check

import jsonfile from 'jsonfile'

/** @param {string} version */
export const releaseCommitMsg = (version) => `release: v${version}`

/** @param {string} str */
export const capitalize = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

/**
 * @param {string} pathName
 * @returns {Promise<import('type-fest').PackageJson>}
 */
export const readPackageJson = async (pathName) => {
  return await jsonfile.readFile(pathName)
}

/**
 * @param {string} pathName
 * @param {(json: import('type-fest').PackageJson) => Promise<void> | void} transform
 */
export const updatePackageJson = async (pathName, transform) => {
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
export const getSorterFn = (sorters) => {
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
