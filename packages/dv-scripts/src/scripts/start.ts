import execa from 'execa'
import { extensionsWithDot } from '../extensions'

export const start = async () => {
  execa(
    'babel',
    [
      'src',
      '--out-dir',
      'dist',
      '--watch',
      '--no-babelrc',
      '--extensions',
      extensionsWithDot.join(','),
      '--config-file',
      require.resolve('../configs/babel.js'),
    ],
    {
      preferLocal: true,
      stdio: 'inherit',
    },
  )
}
