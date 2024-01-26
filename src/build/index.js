// @ts-check

import { renameSync } from 'node:fs'
import { defineConfig } from 'vite'
import { preserveDirectives } from 'rollup-plugin-preserve-directives'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import dts from 'vite-plugin-dts'

/**
 * @param {import('./index.js').Options} options
 * @returns {import('vite').UserConfig}
 */
export const tanstackBuildConfig = (options) => {
  return defineConfig({
    plugins: [
      externalizeDeps(),
      preserveDirectives(),
      dts({
        outDir: 'dist/esm',
        entryRoot: options.srcDir,
        include: options.srcDir,
        exclude: options.exclude,
        compilerOptions: {
          // @ts-expect-error
          module: 'esnext',
          declarationMap: false,
        },
      }),
      dts({
        outDir: 'dist/cjs',
        entryRoot: options.srcDir,
        include: options.srcDir,
        exclude: options.exclude,
        compilerOptions: {
          // @ts-expect-error
          module: 'commonjs',
          declarationMap: false,
        },
        afterBuild: (emittedFiles) => {
          const paths = Array.from(emittedFiles.keys())
          paths.forEach((path) => {
            renameSync(path, path.replace('.d.ts', '.d.cts'))
          })
        },
      }),
    ],
    build: {
      outDir: 'dist',
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
