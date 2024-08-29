import type { UserConfig } from 'vite'

export type Package = {
  name: string
  entryPoints: Array<string>
  tsconfig: string
  outputDir: string
  exclude?: Array<string>
}

export type Options = {
  /** Config for packages that need reference docs */
  packages: Array<Package>
  gitBranch?: string
}

export function generateReferenceDocs(config: Options): Promise<void>
