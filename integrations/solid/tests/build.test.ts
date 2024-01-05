import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

const esmExtensions = ['.js', '.js.map', '.d.ts']
const cjsExtensions = ['.cjs', '.cjs.map', '.d.cts']

const files = ['index', 'App']

describe('Check Solid build output', () => {
  it('should output the same file structure', () => {
    const distFiles = readdirSync(`${rootDir}/dist`, { recursive: true })
    const snapFiles = readdirSync(`${rootDir}/snap`, { recursive: true })

    expect(distFiles).toEqual(snapFiles)
  })

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
