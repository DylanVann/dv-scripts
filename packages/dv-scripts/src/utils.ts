import readPkgUpBase from 'read-pkg-up'

export const readPkgUp = async (): Promise<any> => {
  const pkg: any | undefined = await readPkgUpBase()
  if (!pkg) {
    throw new Error('Could not find package.json file.')
  }
  return pkg
}

export const hasPropertyInPackageJson = async (property: string) => {
  const pkg = await readPkgUp()
  return Boolean(pkg[property])
}
