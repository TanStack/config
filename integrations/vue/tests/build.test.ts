import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

const esmExtensions = ['.js', '.js.map', '.d.ts']
const cjsExtensions = ['.cjs', '.cjs.map', '.d.cts']

const files = ['index']

describe('Check Vite build output', () => {
  it('should build the same ESM output', () => {
    files.forEach((file) => {
      esmExtensions.forEach((ext) => {
        expect(
          readFileSync(`${rootDir}/dist/esm/${file}${ext}`).toString(),
        ).toMatchFileSnapshot(`${rootDir}/snap/esm/${file}${ext}`)
      })
    })
  })

  it('should build the same CJS output', () => {
    files.forEach((file) => {
      cjsExtensions.forEach((ext) => {
        expect(
          readFileSync(`${rootDir}/dist/cjs/${file}${ext}`).toString(),
        ).toMatchFileSnapshot(`${rootDir}/snap/cjs/${file}${ext}`)
      })
    })
  })
})
