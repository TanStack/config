#!/usr/bin/env node
const args = process.argv.slice(2)
import Liftoff from 'liftoff'
import minimist from 'minimist'
import v8flags from 'v8flags'
import interpret from 'interpret'
const argv = minimist(args)
import { run } from '../src/publish.js'

const Config = new Liftoff({
  name: 'tanstack-config',
  configName: 'tanstack.config',
  extensions: interpret.jsVariants,
  v8flags: v8flags,
})

Config.prepare(
  {
    cwd: argv.cwd,
    configPath: argv.config,
    completion: argv.completion,
  },
  function (prepEnv) {
    Config.execute(prepEnv, (env, args) => console.log({ env, args }))
  },
)
