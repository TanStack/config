export type Commit = {
  commit: CommitOrTree
  tree: CommitOrTree
  author: AuthorOrCommitter
  committer: AuthorOrCommitter
  subject: string
  body: string
  parsed: Parsed
}

export type CommitOrTree = {
  long: string
  short: string
}

export type AuthorOrCommitter = {
  name: string
  email: string
  date: string
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
  // Contains config for publishable branches.
  branchConfigs: Record<string, BranchConfig>
  // List your npm packages here. The first package will be used as the versioner.
  packages: Package[]
  rootDir: string
  // The branch to publish. Defaults to the current branch if none supplied.
  branch?: string
  // The tag to publish. Must start with `v`
  tag?: string
  // The GitHub token used to search for user metadata and make a GitHub release.
  ghToken?: string
}
