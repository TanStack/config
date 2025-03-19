---
id: ci-cd
title: CI/CD
---

## GitHub Workflows

- `pr.yml`:
    - Runs tests for all pull requests
    - Runs `nx affected`, which only executes tasks with invalidated cache
    - Also uses `pkg-pr-new` to publish package previews and create links to our examples
- `release.yml`:
    - Runs tests for code merged into release branches
    - Runs `nx run-many`, which executes all tasks and ensures the outputs are present (necessary for publishing builds)
    - Uses [Changesets](https://github.com/changesets/changesets) to handle versioning and publishing

## Nx

The TanStack projects use Nx to enable rapid execution of our tests and builds. Tasks are parallelised and cached both locally and in CI. While Nx has an extensive plugin system, we only utilise Nx as an NPM script runner.

### Config Files

- `./nx.json`: Main config file, which defines task dependencies, inputs, and outputs
- `./package.json`: Need to manually specify root-level scripts (e.g. `test:format`)
- `./**/package.json`: Package-level scripts (e.g. `build`) are automatically detected

### Nx Agents

- Nx allows you to distribute your tasks across multiple CI machines, increasing the number of jobs that can be run in parallel
- Please note that this does incur quite a significant startup delay
