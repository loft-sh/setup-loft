import * as core from '@actions/core'
import * as os from 'os'

import {installKubectl} from './kubectl'
import {installLoft} from './loft'
import {loginToLoft} from './login'

async function run(): Promise<void> {
  const runnerPlatform: string = os.platform()
  const architecture: string = os.arch()

  try {
    core.startGroup('Install Loft CLI')
    const version: string = core.getInput('version') || 'latest'
    await installLoft(runnerPlatform, architecture, version)
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  } finally {
    core.endGroup()
  }

  try {
    core.startGroup('Login to Loft')
    const loftUrl: string = core.getInput('url', {required: true})
    const loftAccessKey: string = core.getInput('access-key', {
      required: true
    })
    const insecure: boolean = core.getBooleanInput('insecure')
    const dockerLogin: boolean = core.getBooleanInput('docker-login')
    await loginToLoft(loftUrl, loftAccessKey, insecure, dockerLogin)
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  } finally {
    core.endGroup()
  }

  const kubectlInstallEnabled = core.getBooleanInput('kubectl-install')
  if (kubectlInstallEnabled) {
    try {
      core.startGroup('Install kubectl')
      const kubectlVersion = core.getInput('kubectl-version') || 'latest'
      await installKubectl(runnerPlatform, architecture, kubectlVersion)
    } catch (error: unknown) {
      if (error instanceof Error) {
        core.setFailed(error.message)
      }
    } finally {
      core.endGroup()
    }
  }
}

run()
