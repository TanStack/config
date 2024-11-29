// @ts-check

import { defineConfig } from 'vite'
import { preserveDirectives } from 'rollup-plugin-preserve-directives'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

/**
 * @param {{content: string, extension: string}} params
 * @returns
 */
function ensureImportFileExtension({ content, extension }) {
  // replace e.g. `import { foo } from './foo'` with `import { foo } from './foo.js'`
  content = content.replace(
    /(im|ex)port\s[\w{}/*\s,]+from\s['"]\.\.?\/[^.'"]+(?=['"];?)/gm,
    `$&.${extension}`,
  )

  // replace e.g. `import('./foo')` with `import('./foo.js')`
  content = content.replace(
    /import\(['"]\.\.?\/[^.'"]+(?=['"];?)/gm,
    `$&.${extension}`,
  )
  return content
}

/**
 * @param {import('./index.js').Options} options
 * @returns {import('vite').UserConfig}
 */
export const tanstackViteConfig = (options) => {
  const outDir = options.outDir ?? 'dist'
  const cjs = options.cjs ?? true

  return defineConfig({
    plugins: [
      externalizeDeps({ include: options.externalDeps ?? [] }),
      preserveDirectives(),
      tsconfigPaths({
        projects: options.tsconfigPath ? [options.tsconfigPath] : undefined,
      }),
      dts({
        outDir: `${outDir}/esm`,
        entryRoot: options.srcDir,
        include: options.srcDir,
        exclude: options.exclude,
        tsconfigPath: options.tsconfigPath,
        compilerOptions: {
          module: 99, // ESNext
          declarationMap: false,
        },
        beforeWriteFile: (filePath, content) => ({
          filePath,
          content: ensureImportFileExtension({ content, extension: 'js' }),
        }),
        afterDiagnostic: (diagnostics) => {
          if (diagnostics.length > 0) {
            console.error('Please fix the above type errors')
            process.exit(1)
          }
        },
      }),
      cjs
        ? dts({
            outDir: `${outDir}/cjs`,
            entryRoot: options.srcDir,
            include: options.srcDir,
            exclude: options.exclude,
            tsconfigPath: options.tsconfigPath,
            compilerOptions: {
              module: 1, // CommonJS
              declarationMap: false,
            },
            beforeWriteFile: (filePath, content) => ({
              filePath: filePath.replace('.d.ts', '.d.cts'),
              content: ensureImportFileExtension({ content, extension: 'cjs' }),
            }),
            afterDiagnostic: (diagnostics) => {
              if (diagnostics.length > 0) {
                console.error('Please fix the above type errors')
                process.exit(1)
              }
            },
          })
        : undefined,
    ],
    build: {
      outDir,
      minify: false,
      sourcemap: true,
      lib: {
        entry: options.entry,
        formats: cjs ? ['es', 'cjs'] : ['es'],
        fileName: (format) => {
          if (format === 'cjs') return 'cjs/[name].cjs'
          return 'esm/[name].js'
        },
      },
      rollupOptions: {
        output: {
          preserveModules: true,
        },
      },
    },
  })
}
