export type Options = {
  /** Entry file, e.g. `./src/index.ts` */
  entry: string | Array<string>
  /** Source directory used for type generation, e.g. `./src` */
  srcDir: string
  /** Excluded from type generation, e.g. `[./src/tests]` */
  exclude?: Array<string>
  /** Directory where build output will be placed, e.g. `./dist` */
  outDir?: string
  /** Generate CJS output, defaults to `true` */
  cjs?: boolean
  /** Optional path to a custom tsconfig file, defaults to `./tsconfig.json` */
  tsconfigPath?: string
  /** Additional dependencies to externalize if not detected by `vite-plugin-externalize-deps` */
  externalDeps?: Array<string | RegExp>
  /** Dependencies to bundle. Will be passed to the except argument of `vite-plugin-externalize-deps` */
  bundledDeps?: Array<string | RegExp>
  /** Hook called prior to writing each declaration file; allows to transform the content */
  beforeWriteDeclarationFile?: (filePath: string, content: string) => string
}
