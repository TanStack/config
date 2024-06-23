export type Commit = {
  hash: string
  body: string
  message: string
  author_name: string
  author_email: string
  type: string
  scope: string | null | undefined
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
