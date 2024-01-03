import type { UserConfig } from 'vite'

export type Options = {
  entry: string | string[]
  srcDir: string
  exclude?: string[]
}

export function tanstackBuildConfig(config: Options): UserConfig
