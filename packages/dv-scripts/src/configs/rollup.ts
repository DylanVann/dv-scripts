import { RollupOptions } from 'rollup'
import * as fs from 'fs'
import * as path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// @ts-ignore
import babel from '@rollup/plugin-babel'
import pkgDir from 'pkg-dir'
import { extensions, extensionsWithDot } from '../extensions'
import babelConfig = require('./babel')

const root = pkgDir.sync()

if (typeof root !== 'string') {
  throw new Error('Could not find root.')
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.join(root, 'package.json'))

// Allow an input file with any of our supported extensions.
const inputFilePath = extensions
  .map((ext) => path.join(root, 'src', `index.${ext}`))
  .find((p) => fs.existsSync(p))

if (!inputFilePath) {
  throw new Error('No input file.')
}

const inputFilePathRelative = path.relative(root, inputFilePath)

if (pkg.main && pkg.main !== 'dist/index.cjs.js') {
  console.warn(
    'We usually use the value "dist/index.cjs.js" for the "main" field.',
  )
}

if (pkg.module && pkg.module !== 'dist/index.js') {
  console.warn(
    'We usually use the value "dist/index.js" for the "module" field.',
  )
}

const config: RollupOptions = {
  input: inputFilePathRelative,
  output: [
    pkg.main && {
      file: pkg.main,
      format: 'cjs' as const,
    },
    pkg.module && {
      file: pkg.module,
      format: 'esm' as const,
    },
  ].filter(Boolean),
  external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
  plugins: [
    babel({
      babelrc: false,
      configFile: false,
      babelHelpers: 'runtime',
      extensions: extensionsWithDot,
      ...babelConfig,
    }),
    resolve({ extensions: extensionsWithDot }),
    commonjs({ extensions: extensionsWithDot }),
  ],
}

module.exports = config
export {}
