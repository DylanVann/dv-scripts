import yargs from 'yargs'

yargs
  .command(
    'build',
    'Build a package using Rollup.',
    (v) => v,
    async (options) => {
      const { build } = await import('./scripts/build.js')
      await build()
    },
  )
  .command(
    'start',
    'Start a package using Babel.',
    (v) => v,
    async (options) => {
      const { start } = await import('./scripts/start.js')
      await start()
    },
  )
  .command(
    'lint',
    'Lint a package using ESLint.',
    (v) => v,
    async (options) => {
      const { lint } = await import('./scripts/lint.js')
      await lint()
    },
  )
  .command(
    'test',
    'Test a package using Jest.',
    (v) => v,
    async (options) => {
      const { test } = await import('./scripts/test.js')
      await test()
    },
  )
  .demandCommand(1, '')
  .parse()
