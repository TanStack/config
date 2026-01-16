---
id: vite
title: Vite
---

The Vite build setup was the result of several attempts to dual publish ESM and CJS for TanStack projects, while preserving compatibility with all Typescript module resolution options.

## Do I need dual publishing?

ES Modules (ESM) is the standard for writing JavaScript modules. However, due to the historical dependency on CommonJS (CJS), many ecosystem tools and projects were initially incompatible with ESM. It is becoming exceedingly rare for this to be the case, and I would urge you to consider whether it is necessary to distribute CJS code at all. Sindre Sorhus has a good summary on this issue [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Do I need this package?

Many alternatives have bene created recently, with the most notable being [tsdown](https://github.com/rolldown/tsdown), built on top of `rolldown`. We will be adopting tsdown for future projects rather than continuing to use our custom Vite setup.

## Installation

To install the package, run the following command:

```bash
pnpm add -D @tanstack/vite-config
```

## Frameworks

| Framework | Dual Types                    | ESM only                                                                             |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| Vanilla   | [tsdown](https://tsdown.dev/) | [tsdown](https://tsdown.dev/) or [tsc](https://www.npmjs.com/package/typescript)     |
| Angular   | Not required                  | [ng-packagr](https://www.npmjs.com/package/ng-packagr) (official tool)               |
| React     | [tsdown](https://tsdown.dev/) | [tsdown](https://tsdown.dev/) or [tsc](https://www.npmjs.com/package/typescript)     |
| Solid     | Not required                  | [tsc](https://www.npmjs.com/package/typescript) (preserves JSX, necessary for SSR)   |
| Svelte    | Not required                  | [@sveltejs/package](https://www.npmjs.com/package/@sveltejs/package) (official tool) |
| Vue       | [tsdown](https://tsdown.dev/) | [tsdown](https://tsdown.dev/) or [tsc](https://www.npmjs.com/package/typescript)     |

## Legacy Setup

The build config is opinionated, and was designed to work with our internal libraries. If you follow the below instructions, it _may_ work for your library too!

### package.json

- Ensure `"type": "module"` is set.
- Ensure you have [Vite](https://www.npmjs.com/package/vite) installed. Installing [Publint](https://www.npmjs.com/package/publint) is also recommended.
- Change your build script to `"build": "vite build && publint --strict"`
- Ensure you have an `"exports"` field. We use this, but you might have different requirements:

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./dist/esm/index.d.ts",
        "default": "./dist/esm/index.js"
      },
      "require": {
        "types": "./dist/cjs/index.d.cts",
        "default": "./dist/cjs/index.cjs"
      }
    },
    "./package.json": "./package.json"
  }
}
```

### tsconfig.json

- Ensure your `"include"` field includes `"vite.config.ts"`.
- Set `"moduleResolution"` to `"bundler"`.

### vite.config.ts

- Import `mergeConfig` and `tanstackViteConfig`.
- Merge your custom config first, followed by `tanstackViteConfig`.
- Please avoid modifying `build` in your custom config.
- See an example below:

```ts
import { defineConfig, mergeConfig } from 'vite'
import { tanstackViteConfig } from '@tanstack/vite-config'

const config = defineConfig({
  // Framework plugins, vitest config, etc.
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    entry: './src/index.ts',
    srcDir: './src',
  }),
)
```
