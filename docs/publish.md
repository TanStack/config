---
id: publish
title: Publish
---

## Installation

To install the package, run the following command:

```bash
pnpm add -D @tanstack/publish-config
```


## Usage

To use the TanStack Config programmatically, you can import the `publish` function:

```ts
import { publish } from '@tanstack/publish-config'

publish({
  branchConfigs: configOpts.branchConfigs,
  packages: configOpts.packages,
  rootDir: configOpts.rootDir,
  branch: process.env.BRANCH,
  tag: process.env.TAG,
  ghToken: process.env.GH_TOKEN,
})
  .then(() => {
    console.log('Successfully published packages!')
  })
  .catch(console.error)
```

> The programmatic usage is only available for ESM packages. To support this, you have to have:
>
> ```json
> {
>   "type": "module"
> }
> ```
>
> in your `package.json` file and use `import` instead of `require`.
