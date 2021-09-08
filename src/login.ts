import * as core from '@actions/core'
import {exec} from '@actions/exec'
import {URL} from 'url'

export async function loginToLoft(
  url: string,
  accessKey: string,
  insecure: boolean
): Promise<void> {
  if (url === '') {
    throw new Error('No Loft url provided')
  }

  try {
    new URL(url)
  } catch (error) {
    throw new Error('Invalid Loft url provided')
  }

  if (accessKey === '') {
    throw new Error('No Loft access key provided')
  }

  try {
    await exec(
      insecure
        ? `loft login ${url} --access-key ${accessKey} --insecure`
        : `loft login ${url} --access-key ${accessKey}`
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
