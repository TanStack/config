# @tanstack/oxlint-config

## 0.2.0

### Minor Changes

- [#433](https://github.com/TanStack/config/pull/433) [`25140d1`](https://github.com/TanStack/config/commit/25140d1eec9887d9a8845a531476b1091f853278) - Align the shared configs with each other:

  - `@tanstack/eslint-config`: classify `~/`, `@/` and `#` imports as internal in `import/order`, matching the `internalPattern` used by the `sortImports` of `@tanstack/oxfmt-config`
  - `@tanstack/oxlint-config`: enforce `@stylistic/spaced-comment` from `@tanstack/eslint-config`, which Oxfmt does not handle

## 0.1.0

### Minor Changes

- [#415](https://github.com/TanStack/config/pull/415) [`ba82748`](https://github.com/TanStack/config/commit/ba827481d078846aa31ec88677d0930e19059c8e) - Add `@tanstack/oxlint-config`, a port of `@tanstack/eslint-config` to Oxlint
