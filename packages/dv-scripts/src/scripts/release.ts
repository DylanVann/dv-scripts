import execa from 'execa'
import findYarnWorkspaceRoot from 'find-yarn-workspace-root'

export const release = async ({
  gitHubToken,
  npmToken,
  args,
}: {
  gitHubToken?: string
  npmToken?: string
  args: string[]
}) => {
  const isInWorkspace = findYarnWorkspaceRoot() !== null
  if (!gitHubToken) {
    throw new Error(
      `We need the GITHUB_TOKEN environment variable to be set to perform a release.`,
    )
  }

  if (!npmToken) {
    throw new Error(
      `We need the NPM_TOKEN environment variable to be set to perform a release.`,
    )
  }

  const execaOptions = {
    preferLocal: true,
    stdio: 'inherit',
  } as const

  const extendsArgs = [
    '--extends',
    require.resolve('./config/semanticRelease.js'),
  ]

  if (isInWorkspace) {
    await execa('multi-semantic-release', [...extendsArgs], execaOptions)
  } else {
    await execa('semantic-release', [...extendsArgs], execaOptions)
  }
}
