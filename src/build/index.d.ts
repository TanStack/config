import type { UserConfig } from 'vite'

export type Options = {
  /** Entry file, e.g. `./src/index.ts` */
  entry: string | string[]
  /** Source directory used for type generation, e.g. `./src` */
  srcDir: string
  /** Excluded from type generation, e.g. `[./src/tests]` */
  exclude?: string[]
  /** Directory where build output will be placed, e.g. `./dist` */
  outDir?: string
}

export function tanstackBuildConfig(config: Options): UserConfig
