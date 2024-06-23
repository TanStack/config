export type Commit = {
  body: string
  message: string
  parsed: Parsed
}

export type Parsed = {
  type: string | null
  scope?: string | null
  subject: string
  merge?: null
  header: string
  body?: null
  footer?: null
  notes?: Array<null> | null
  references?: Array<null> | null
  mentions?: Array<null> | null
  revert?: null
  raw: string
}

export type Package = {
  name: string
  packageDir: string
}

export type BranchConfig = {
  prerelease: boolean
  previousVersion?: boolean
}

export type RunOptions = {
  /** Contains config for publishable branches. */
  branchConfigs: Record<string, BranchConfig>
  /** List your npm packages here. The first package will be used as the versioner. */
  packages: Array<Package>
  /** Path to root directory of your project. */
  rootDir: string
  /** The branch to publish. Defaults to the current branch if none supplied. */
  branch?: string
  /** A manual tag to force release. Must start with `v` */
  tag?: string
  /** The GitHub token used to search for user metadata and make a GitHub release. */
  ghToken?: string
}
