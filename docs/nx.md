---
id: nx
title: Nx
---

## Summary

The TanStack projects use Nx to enable rapid execution of our tests and builds. These can be parallelised and cached both locally and in CI. While Nx has an extensive plugin system, we only utilise Nx as an NPM script runner.

## Files

- `./nx.json`: Main config file, which defines task dependencies, inputs, and outputs
- `./package.json`: Need to manually specify root-level scripts (e.g. `test:format`)
- `./**/package.json`: Package-level scripts (e.g. `build`) are automatically detected

## Our Workflows

- `pr.yml`: Runs `nx affected`, which only executes tasks with invalidated cache
- `ci.yml`: Runs `nx run-many`, which executes all tasks and ensures the outputs are present (necessary for publishing builds)

## Nx Agents

- Nx allows you to distribute your tasks across multiple CI machines, increasing the number of jobs that can be run in parallel
- Please note that this does incur quite a significant startup delay
