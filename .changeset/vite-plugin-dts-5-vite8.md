---
'@tanstack/vite-config': minor
---

Support vite-plugin-dts 5

- Bump the bundled `vite-plugin-dts` to `5.0.3`, which adds TypeScript 7 / tsgo
  support and renames the `outDir` option to `outDirs`.
- Emit `preserveModules` under both `build.rolldownOptions` and
  `build.rollupOptions`, so module preservation holds whether the consumer
  builds with Vite 7 (Rollup) or Vite 8 (Rolldown).

This lets consumers on the new toolchain build declarations without patching
`@tanstack/vite-config`.
