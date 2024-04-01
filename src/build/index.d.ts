import type { UserConfig } from 'vite'

export type Options = {
  /** Entry file, e.g. `./src/index.ts` */
  entry: string | Array<string>
  /** Source directory used for type generation, e.g. `./src` */
  srcDir: string
  /** Excluded from type generation, e.g. `[./src/tests]` */
  exclude?: Array<string>
  /** Directory where build output will be placed, e.g. `./dist` */
  outDir?: string
  /** The path to the tsconfig file, e.g. `./tsconfig.json` */
  tsconfigPath?: string;
  /** Additional dependencies to externalize if not detected by `vite-plugin-externalize-deps` */
  externalDeps?: Array<string | RegExp>
}

/** https://tanstack.com/config/latest/docs/build */
export function tanstackBuildConfig(config: Options): UserConfig
