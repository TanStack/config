---
id: eslint
title: ESLint
---

## Setup

### package.json

- Make sure you have ESLint v8.57.0+ installed
- We will upgrade to ESLint v9 once `typescript-eslint` v8 and `eslint-plugin-react-hooks` v5 release

### eslint.config.js

```js
import { rootConfig } from '@tanstack/config/eslint'

export default [
  ...rootConfig,
  {
    // Custom rules go here
  },
]
```
