import readPkgUpBase from 'read-pkg-up'

export const readPkgUp = async (): Promise<{
  packageJson: any
  path: string
}> => {
  const pkg: any | undefined = await readPkgUpBase()
  if (!pkg) {
    throw new Error('Could not find package.json file.')
  }
  return pkg
}
