import execa from 'execa'

export const build = async (args: string[]) => {
  try {
    await execa('tsc', ['--build'], { preferLocal: true, stdio: 'inherit' })
  } catch (e) {
    process.exit(1)
  }
  try {
    const config = ['--config', require.resolve('../configs/rollup.js')]
    await execa('rollup', [...config, ...args], {
      preferLocal: true,
      stdio: 'inherit',
    })
  } catch (e) {
    process.exit(1)
  }
  process.exit(0)
}
