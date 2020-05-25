import execa from 'execa'

export const build = async () => {
  try {
    await execa('tsc', ['--build'], { preferLocal: true, stdio: 'inherit' })
  } catch (e) {
    process.exit(1)
  }
  try {
    await execa(
      'rollup',
      ['--config', require.resolve('../configs/rollup.js')],
      { preferLocal: true, stdio: 'inherit' },
    )
  } catch (e) {
    process.exit(1)
  }
  process.exit(0)
}
