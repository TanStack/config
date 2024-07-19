---
id: package-structure
title: Package Structure
---

The following structure ensures packages work optimally with our monorepo/Nx workflow.

### `./package.json`

- All TanStack projects have `"type": "module"` to set the default resolution of `.js` files to ESM; this does not have any impact on building for CJS
- It is also essential to have an `"exports"` field
- For legacy reasons, you should also include the `"main"`, `"module"`, and `"types"` fields
- All packages have the following scripts which are cached by Nx: `"test:eslint"`, `"test:types"`, `"test:lib"`, `"build"`, `"test:build"`

### `./tsconfig.json`

- Extends the root-level tsconfig (e.g. `"extends": "../../tsconfig.json"`)
- Add any framework-specific options and included files here

### `./vite.config.ts`

- Includes config for Vitest, and for Vite if [@tanstack/config/vite](./vite.md) is used

### `./src`

- This folder should only include code which gets built and shipped to users
- Tests should not be placed in this folder, as they bloat the shipped code, and can unintentionally invalidate the Nx cache

### `./tests`

- This folder should include all test files
- It should also include any test setup files required by that framework
