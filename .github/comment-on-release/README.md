# Comment on Release Action

A reusable GitHub Action that automatically comments on PRs and linked issues when they are included in a release.

## What It Does

When packages are published via Changesets:

1. Parses each published package's CHANGELOG to find PR numbers in the latest version
2. Groups PRs by number (handling cases where one PR affects multiple packages)
3. Posts a comment on each PR with release info and CHANGELOG links
4. Finds issues that each PR closes/fixes using GitHub's GraphQL API
5. Posts comments on linked issues notifying them of the release

## Example Comments

### On a PR:

```
🎉 This PR has been released!

- [@tanstack/query-core@5.0.0](https://github.com/TanStack/query/blob/main/packages/query-core/CHANGELOG.md#500)
- [@tanstack/react-query@5.0.0](https://github.com/TanStack/query/blob/main/packages/react-query/CHANGELOG.md#500)

Thank you for your contribution!
```

### On a linked issue:

```
🎉 The PR fixing this issue (#123) has been released!

- [@tanstack/query-core@5.0.0](https://github.com/TanStack/query/blob/main/packages/query-core/CHANGELOG.md#500)

Thank you for reporting!
```

## Usage

Add this step to your `.github/workflows/release.yml` file after the `changesets/action` step:

```yaml
- name: Run Changesets (version or publish)
  id: changesets
  uses: changesets/action@v1.5.3
  with:
    version: pnpm run changeset:version
    publish: pnpm run changeset:publish
    commit: 'ci: Version Packages'
    title: 'ci: Version Packages'
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

- name: Comment on PRs about release
  if: steps.changesets.outputs.published == 'true'
  uses: tanstack/config/.github/comment-on-release@main
  with:
    published-packages: ${{ steps.changesets.outputs.publishedPackages }}
```

## Requirements

- Must be using [Changesets](https://github.com/changesets/changesets) for releases
- CHANGELOGs must include PR links in the format: `[#123](https://github.com/org/repo/pull/123)`
- Requires `pull-requests: write` and `issues: write` permissions in the workflow
- The `gh` CLI must be available (automatically available in GitHub Actions)

## Inputs

| Input                | Required | Description                                                        |
| -------------------- | -------- | ------------------------------------------------------------------ |
| `published-packages` | Yes      | JSON string of published packages from `changesets/action` outputs |

## How It Works

The action:

1. Receives the list of published packages from the Changesets action
2. For each package, reads its CHANGELOG at `packages/{package-name}/CHANGELOG.md`
3. Extracts PR numbers from the latest version section using regex
4. Groups all PRs and tracks which packages they contributed to
5. Posts a single comment per PR listing all packages it was released in
6. For each PR, queries GitHub's GraphQL API to find linked issues (via `closes #N` or `fixes #N` keywords)
7. Groups issues and tracks which PRs fixed them
8. Posts comments on linked issues notifying them of the release
9. Checks for duplicate comments to avoid spamming
10. Uses the `gh` CLI to post comments via the GitHub API

## Troubleshooting

**No comments are posted:**

- Verify your CHANGELOGs have PR links in the correct format
- Check that `steps.changesets.outputs.published` is `true`
- Ensure the workflow has `pull-requests: write` and `issues: write` permissions

**Script fails to find CHANGELOGs:**

- The script expects packages at `packages/{package-name}/CHANGELOG.md`
- Package name should match after removing the scope (e.g., `@tanstack/query-core` → `query-core`)

**Issues aren't being commented on:**

- Verify that PRs use GitHub's closing keywords (`closes #N`, `fixes #N`, `resolves #N`, etc.) in the PR description
- Check that the linked issues exist and are accessible
- Ensure the `issues: write` permission is granted in the workflow
