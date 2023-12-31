#!/usr/bin/env node
const args = process.argv.slice(2)
import Liftoff from 'liftoff'
import minimist from 'minimist'
import v8flags from 'v8flags'
import interpret from 'interpret'
const argv = minimist(args)
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { run } from '../src/publish.js'

const require = createRequire(import.meta.url)

async function requireOrImport(path) {
  try {
    return require(path)
  } catch (e) {
    if (pathToFileURL && e.code === 'ERR_REQUIRE_ESM') {
      // This is needed on Windows, because import() fails if providing a Windows file path.
      const url = pathToFileURL(path)
      return import(url)
    }
    throw e
  }
}

const Config = new Liftoff({
  name: 'tanstack-config',
  configName: 'tanstack.config',
  extensions: interpret.jsVariants,
  preload: 'esbuild-register/dist/node',
  v8flags: v8flags,
})

Config.prepare(
  {
    cwd: argv.cwd,
    configPath: argv.config,
    completion: argv.completion,
  },
  function (prepEnv) {
    Config.execute(prepEnv, (env) => {
      requireOrImport(env.configPath)
        .then((configOpts) => {
          return run({
            branchConfigs: configOpts.branchConfigs,
            packages: configOpts.packages,
            rootDir: configOpts.rootDir,
            branch: process.env.BRANCH,
            tag: process.env.TAG,
            ghToken: process.env.GH_TOKEN,
          })
        })
        .catch(console.error)
    })
  },
)
