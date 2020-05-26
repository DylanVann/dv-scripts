import execa from 'execa'
import { extensions } from '../extensions'
import pkgDir from 'pkg-dir'
import path from 'path'

const root = pkgDir.sync() as string

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.join(root, 'package.json'))

const args = process.argv.slice(3)

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

const configArgs = pkg.eslintConfig
  ? []
  : ['--config', require.resolve('eslint-config-dv-scripts')]

export const lint = async () => {
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
    const inputGlob = `**/*.{${extensions.join(',')}}`
    const fixArgs = fix ? ['--write'] : ['--check']
    const config = ['--config', require.resolve('../configs/prettier.js')]
    await execa('prettier', [...ignoreArgs, inputGlob, ...config, ...fixArgs], {
      preferLocal: true,
      stdio: 'inherit',
    })
  } catch (e) {
    console.log('You can run "yarn lint --fix" to resolve this.')
    process.exit(1)
  }

  process.exit(0)
}
