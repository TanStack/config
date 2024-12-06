import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdir, rm } from 'node:fs/promises'
import * as TypeDoc from 'typedoc'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/**
 * @type {Partial<import("typedoc").TypeDocOptions & import("typedoc-plugin-markdown").PluginOptions>}
 */
const settings = {
  plugin: [
    'typedoc-plugin-markdown',
    'typedoc-plugin-frontmatter',
    resolve(__dirname, './typedoc-custom-settings.js'),
  ],
  hideGenerator: true,
  readme: 'none',
  entryFileName: 'index',
  hideBreadcrumbs: true,
  hidePageHeader: true,
  useCodeBlocks: true,
  excludePrivate: true,
}

/**
 * @param {import('./index.js').Options} options
 * @returns {Promise<void>}
 */
export const generateReferenceDocs = async (options) => {
  for (const pkg of options.packages) {
    // Clean and recreate the output directories
    try {
      await rm(pkg.outputDir, { recursive: true })
    } catch (error) {
      // @ts-expect-error
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
    await mkdir(pkg.outputDir, { recursive: true })

    const app = await TypeDoc.Application.bootstrapWithPlugins({
      ...settings,
      gitRevision: options.gitBranch ?? 'main',
      entryPoints: pkg.entryPoints,
      tsconfig: pkg.tsconfig,
      exclude: pkg.exclude,
      out: pkg.outputDir,
    })

    const project = await app.convert()

    if (project) {
      await app.generateOutputs(project)
    }
  }
}
