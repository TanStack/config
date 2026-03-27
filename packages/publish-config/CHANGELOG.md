# @tanstack/publish-config

## 0.2.6

### Patch Changes

- Pass GH_TOKEN as an explicit input to composite GitHub actions so the token is available inside inner steps. ([`7222fcd`](https://github.com/TanStack/config/commit/7222fcdd4203a42f8566689fd69651ffbcc88de6))

## 0.2.5

### Patch Changes

- Fix composite GitHub actions so `GH_TOKEN` is forwarded into the action steps that post release and preview comments. ([`ea41266`](https://github.com/TanStack/config/commit/ea412667b0b1559cda150dfa5f4b2a5189585682))

## 0.2.4

### Patch Changes

- Fix release-related GH_TOKEN handling so composite GitHub actions inherit the token from workflow env. ([`9c303c6`](https://github.com/TanStack/config/commit/9c303c60f811993816212c95017f49be5cc4bf0e))

## 0.2.3

### Patch Changes

- Standardize GitHub auth token usage on `GH_TOKEN` for release-related tooling and workflows. ([`a2c8f9c`](https://github.com/TanStack/config/commit/a2c8f9c75e69befb22cc16f7e0e35a925debabd2))

## 0.2.2

### Patch Changes

- chore: update deps ([#315](https://github.com/TanStack/config/pull/315))

## 0.2.1

### Patch Changes

- chore: update dependencies ([#285](https://github.com/TanStack/config/pull/285))

## 0.2.0

### Minor Changes

- don't remove package scripts before publish ([#258](https://github.com/TanStack/config/pull/258))

## 0.1.1

### Patch Changes

- fix(publish): use 'previous' npm tag for old releases ([#249](https://github.com/TanStack/config/pull/249))

## 0.1.0

### Minor Changes

- [#222](https://github.com/TanStack/config/pull/222) [`43aae6e`](https://github.com/TanStack/config/commit/43aae6efe2642634e1ce1867b80b15a8cc829ac6) Thanks [@lachlancollins](https://github.com/lachlancollins)! - Release @tanstack/publish-config
