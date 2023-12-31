import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

const esmExtensions = ['.js', '.js.map', '.d.ts', '.d.ts.map']
const cjsExtensions = ['.cjs', '.cjs.map', '.d.cts']

describe('Build React', () => {
  it('should build the same ESM output', () => {
    const file = 'esm/index'
    esmExtensions.forEach((ext) => {
      expect(
        readFileSync(`${rootDir}/dist/${file}${ext}`).toString(),
      ).toMatchFileSnapshot(`${rootDir}/snap/${file}${ext}`)
    })
  })

  it('should build the same CJS output', () => {
    const file = 'cjs/index'
    cjsExtensions.forEach((ext) => {
      expect(
        readFileSync(`${rootDir}/dist/${file}${ext}`).toString(),
      ).toMatchFileSnapshot(`${rootDir}/snap/${file}${ext}`)
    })
  })
})
