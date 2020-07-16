import isCI from 'is-ci'
import { readPkgUp } from '../utils'
import execa from 'execa'
import jestConfig = require('../configs/jest')

export const test = async (args: string[]) => {
  const pkg = await readPkgUp()
  const watchArgs: string[] =
    !isCI &&
    !args.includes('--no-watch') &&
    !args.includes('--coverage') &&
    !args.includes('--updateSnapshot')
      ? ['--watch']
      : []

  const configArgs: string[] =
    args.includes('--config') || pkg.packageJson.jest
      ? []
      : ['--config', JSON.stringify(jestConfig)]

  // CircleCI issues: https://discuss.circleci.com/t/jest-out-of-memory-error/32263
  const maxWorkersArgs = isCI ? ['--maxWorkers=2'] : []
  process.env.BABEL_ENV = 'test'
  process.env.NODE_ENV = 'test'
  await execa(
    'jest',
    [
      ...configArgs,
      ...watchArgs,
      '--passWithNoTests',
      ...maxWorkersArgs,
      ...args,
    ],
    {
      preferLocal: true,
      stdio: 'inherit',
    },
  )
}
