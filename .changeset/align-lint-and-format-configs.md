---
'@tanstack/eslint-config': minor
'@tanstack/oxlint-config': minor
---

Align the shared configs with each other:

- `@tanstack/eslint-config`: classify `~/`, `@/` and `#` imports as internal in `import/order`, matching the `internalPattern` used by the `sortImports` of `@tanstack/oxfmt-config`
- `@tanstack/oxlint-config`: enforce `@stylistic/spaced-comment` from `@tanstack/eslint-config`, which Oxfmt does not handle
