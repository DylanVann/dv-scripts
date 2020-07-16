import isCI from 'is-ci'
import { readPkgUp } from '../utils'
import jestConfig = require('../configs/jest')

export const test = async (args: string[]) => {
  const pkg = await readPkgUp()
  const watch: string[] =
    !isCI &&
    !args.includes('--no-watch') &&
    !args.includes('--coverage') &&
    !args.includes('--updateSnapshot')
      ? ['--watch']
      : []

  const config: string[] =
    args.includes('--config') || pkg.packageJson.jest
      ? []
      : ['--config', JSON.stringify(jestConfig)]

  // CircleCI issues: https://discuss.circleci.com/t/jest-out-of-memory-error/32263
  const maxWorkers = isCI ? ['--maxWorkers=2'] : []
  process.env.BABEL_ENV = 'test'
  process.env.NODE_ENV = 'test'
  require('jest').run([
    ...config,
    ...watch,
    '--passWithNoTests',
    ...maxWorkers,
    ...args,
  ])
}
