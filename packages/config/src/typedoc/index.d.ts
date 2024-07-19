import type { UserConfig } from 'vite'

export type Options = {
  /** Config for packages that need reference docs */
  packages: Array<{
    name: string
    entryPoints: Array<string>
    tsconfig: string
    outputDir: string
    exclude?: Array<string>
  }>
}

export function generateReferenceDocs(config: Options): Promise<void>
