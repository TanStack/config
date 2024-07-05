// @ts-check

import { defineConfig } from 'vite'
import { preserveDirectives } from 'rollup-plugin-preserve-directives'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

/**
 * @param {import('./index.js').Options} options
 * @returns {import('vite').UserConfig}
 */
export const tanstackViteConfig = (options) => {
  const outDir = options.outDir ?? 'dist'

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
        beforeWriteFile: (filePath, content) => {
          content = content.replace(
            /^(im|ex)port\s[\w{}*\s,]+from\s['"]\.\/[^.'"]+(?=['"];?$)/gm,
            '$&.js',
          )

          return { filePath, content }
        },
      }),
      dts({
        outDir: `${outDir}/cjs`,
        entryRoot: options.srcDir,
        include: options.srcDir,
        exclude: options.exclude,
        tsconfigPath: options.tsconfigPath,
        compilerOptions: {
          module: 1, // CommonJS
          declarationMap: false,
        },
        beforeWriteFile: (filePath, content) => {
          content = content.replace(
            /^(im|ex)port\s[\w{}*\s,]+from\s['"]\.\/[^.'"]+(?=['"];?$)/gm,
            '$&.cjs',
          )

          filePath = filePath.replace('.d.ts', '.d.cts')

          return { filePath, content }
        },
      }),
    ],
    build: {
      outDir,
      minify: false,
      sourcemap: true,
      lib: {
        entry: options.entry,
        formats: ['es', 'cjs'],
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
