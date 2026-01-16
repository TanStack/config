---
id: dependencies
title: Dependencies
---

We use 3 separate tools to help manage our dependencies and prevent us from unnecessarily bloating the `node_modules` directory.

### Sherif

- Sherif ensures that all references to a dependency throughout the monorepo are on the same version
- This helps avoid pnpm resolution issues, such as type conflicts from having 2+ incompatible versions of the same dependency installed

### Knip

- Knip is able to detect unused dependencies within `package.json` files
- This leads to fewer packages getting installed unnecessarily by developers

### Renovate

- Renovate is a bot which runs on GitHub to scan for outdated or insecure dependencies
- This reduces the burden on maintainers by automatically submitting PRs
