import * as core from '@actions/core'
import * as os from 'os'

import {installLoft} from './install'
import {loginToLoft} from './login'

async function run(): Promise<void> {
  try {
    core.startGroup('Install Loft CLI')
    const version: string = core.getInput('version') || 'latest'
    const runnerPlatform: string = os.platform()
    const architecture: string = os.arch()
    await installLoft(runnerPlatform, architecture, version)
  } catch (error) {
    core.setFailed(error.message)
  } finally {
    core.endGroup()
  }

  try {
    core.startGroup('Login to Loft')
    const loftUrl: string = core.getInput('loft-url', {required: true})
    const loftAccessKey: string = core.getInput('loft-access-key', {
      required: true
    })
    await loginToLoft(loftUrl, loftAccessKey)
  } catch (error) {
    core.setFailed(error.message)
  } finally {
    core.endGroup()
  }
}

run()
