import * as core from '@actions/core'
import {exec} from '@actions/exec'

export async function loginToLoft(
  url: string,
  accessKey: string,
  insecure: boolean,
  dockerLogin: boolean
): Promise<void> {
  if (url === '') {
    throw new Error('No Loft url provided')
  }

  if (accessKey === '') {
    throw new Error('No Loft access key provided')
  }

  try {
    await exec(
      `loft login ${url} --access-key ${accessKey} --docker-login=${dockerLogin} --insecure=${insecure}`
    )
  } catch (error) {
    core.debug(`Loft command failed:
- command:  ${error.cmd}
- exitCode: ${error.code}
- stdout:   ${error.stdout}
- stderr:   ${error.stderr}
`)
    throw error
  }
}
