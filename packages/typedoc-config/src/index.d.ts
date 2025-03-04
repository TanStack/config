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
  /** Override branch for GitHub links */
  gitBranch?: string
}

export function generateReferenceDocs(config: Options): Promise<void>
