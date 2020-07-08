import yargs from 'yargs'
import execa from 'execa'
import { build } from './scripts/build'
import { start } from './scripts/start'
import { lint } from './scripts/lint'
import { test } from './scripts/test'
import { release } from './scripts/release'

export const getArgs = (options: any) => {
  const command = options._[0]
  return process.argv.slice(process.argv.findIndex((v) => v === command) + 1)
}

yargs
  .command(
    'build',
    'Build a package using Rollup.',
    (v) => v,
    async (options) => {
      await build(getArgs(options))
    },
  )
  .command(
    'start',
    'Start a package using Babel.',
    (v) => v,
    async (options) => {
      await start(getArgs(options))
    },
  )
  .command(
    'lint',
    'Lint a package using ESLint.',
    (v) => v,
    async (options) => {
      await lint(getArgs(options))
    },
  )
  .command(
    'test',
    'Test a package using Jest.',
    (v) => v,
    async (options) => {
      await test(getArgs(options))
    },
  )
  .command(
    'release',
    'Release a package, or packages if we are in a monorepo using Yarn workspaces.',
    (v) => v,
    async (options) => {
      const { GITHUB_TOKEN, NPM_TOKEN } = process.env
      await release({
        args: getArgs(options),
        gitHubToken: GITHUB_TOKEN,
        npmToken: NPM_TOKEN,
      })
    },
  )
  .command(
    'ci',
    'Run build, lint, test, release.',
    (v) => v,
    async (options) => {
      await execa('yarn', ['build'])
      await execa('yarn', ['lint'])
      await execa('yarn', ['test'])
      await execa('yarn', ['release'])
    },
  )
  .demandCommand(1, '')
  .parse()
