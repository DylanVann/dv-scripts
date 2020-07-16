import execa from 'execa'
import { extensions } from '../extensions'
import { readPkgUp } from '../utils'

export const lint = async (args: string[]) => {
  const pkg = await readPkgUp()
  const fix = args.includes('--fix')

  const sortPackageJson = async (fix: boolean) => {
    const args = fix ? [] : ['--check']
    await execa('sort-package-json', args, {
      stdio: 'inherit',
      preferLocal: true,
    })
  }

  const useBuiltinIgnore = !args.includes('--ignore-path')

  const lintFilesArgs = ['src']

  const extensionArgs = extensions.flatMap((e) => ['--ext', e])

  const configArgs = pkg.packageJson.eslintConfig
    ? []
    : ['--config', require.resolve('eslint-config-dv-scripts')]

  // sort-package-json
  try {
    await sortPackageJson(fix)
  } catch (e) {
    console.log('You can run "yarn lint --fix" to resolve this.')
    process.exit(1)
  }

  // We use these for ESLint and Prettier.
  const ignoreArgs = useBuiltinIgnore
    ? ['--ignore-path', require.resolve('../../ignore')]
    : []

  // ESLint
  try {
    await execa(
      'eslint',
      [
        ...configArgs,
        '--max-warnings',
        '0',
        ...ignoreArgs,
        ...extensionArgs,
        ...lintFilesArgs,
        ...args,
      ],
      {
        preferLocal: true,
        stdio: 'inherit',
      },
    )
  } catch (e) {
    process.exit(1)
  }

  // Prettier
  try {
    const inputGlobArgs = `src/**/*.{${extensions.join(',')}}`
    const fixArgs = fix ? ['--write'] : ['--check']
    const prettierArgs = pkg.packageJson.prettier
      ? []
      : ['--config', require.resolve('../configs/prettier.js')]
    await execa(
      'prettier',
      [...ignoreArgs, inputGlobArgs, ...prettierArgs, ...fixArgs],
      {
        preferLocal: true,
        stdio: 'inherit',
      },
    )
  } catch (e) {
    console.log('You can run "yarn lint --fix" to resolve this.')
    process.exit(1)
  }

  process.exit(0)
}
