---
id: build
title: Build
---

The Vite build setup provided is the culmination of several attempts to make the TanStack libraries work in all environments, including ESM, CJS, the various TypeScript module resolution options, and a diverse bundler ecosystem.

## Usage

The build config is quite opinionated, as it is designed to work with our internal libraries. If you follow the below instructions, it _may_ work for your library too!

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

- Import `mergeConfig` and `tanstackBuildConfig`.
- Merge your custom config first, followed by `tanstackBuildConfig`.
- Please avoid modifying `build` in your custom config.
- See an example below:

```ts
import { defineConfig, mergeConfig } from 'vite'
import { tanstackBuildConfig } from '@tanstack/config/build'

const config = defineConfig({
  // Framework plugins, vitest config, etc.
})

export default mergeConfig(
  config,
  tanstackBuildConfig({
    entry: 'src/index.ts',
    srcDir: 'src',
  }),
)
```

## Caveats

While this config _will_ work with most frameworks with a Vite adapter, it doesn't mean you _should_ use it for all frameworks. For instance, Svelte publishes [@sveltejs/package](https://www.npmjs.com/package/@sveltejs/package), and Angular publishes [ng-packagr](https://www.npmjs.com/package/ng-packagr). When a framework-specific build tool exists, this should be preferred.
