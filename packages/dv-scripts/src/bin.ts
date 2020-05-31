import yargs from 'yargs'
import { build } from './scripts/build'
import { start } from './scripts/start'
import { lint } from './scripts/lint'
import { test } from './scripts/test'

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
  .demandCommand(1, '')
  .parse()
