#!/usr/bin/env node
import chalk from 'chalk'

const args = process.argv.slice(2)
import Liftoff from 'liftoff'
import minimist from 'minimist'
import v8flags from 'v8flags'
import interpret from 'interpret'
const argv = minimist(args)
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { publish } from '../src/publish.js'
import { Command, Option } from 'commander'
import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(
  fs.readFileSync(join(__dirname, '../package.json'), 'utf8'),
)

const require = createRequire(import.meta.url)

async function requireOrImport(path) {
  if (!path) return null
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

function checkForConfigFile(configPath) {
  if (configPath) return
  console.error(
    [
      chalk.red('No tanstack.config.js file found!'),
      "This may be because you're not passing the --config or --cwd flags.",
      'If you are passing these flags, check that the path is correct.',
      '',
      'Otherwise, you can create a `tanstack.config.js` file in your project root.',
    ].join('\n'),
  )
  process.exit(1)
}

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
          const program = new Command()

          program
            .name('@tanstack/config')
            .description(
              'Configuration and tools for publishing and maintaining high-quality JavaScript packages',
            )
            .version(pkg.version)

          if (configOpts) {
            for (const key of Object.keys(configOpts)) {
              program.setOptionValueWithSource(key, configOpts[key], 'config')
            }
          }

          program
            .command('publish')
            .description(
              'Publish your package with the current working directory',
            )
            .option(
              '--cwd <dir>',
              'Current working directory of the configuration file',
            )
            .option('--config <config>', 'The path to the configuration file')
            .option('--tag <tag>', 'The tag to publish to')
            .option('--branch <branch>', 'The branch to publish from')
            .action((_str, opts) => {
              checkForConfigFile(env.configPath)
              return publish({
                branchConfigs: configOpts.branchConfigs,
                packages: configOpts.packages,
                rootDir: configOpts.rootDir,
                branch: opts.branch ?? process.env.BRANCH,
                tag: opts.tag ?? process.env.TAG,
                ghToken: process.env.GH_TOKEN,
              })
            })

          program.parseAsync().catch(console.error)
        })
        .catch(console.error)
    })
  },
)
