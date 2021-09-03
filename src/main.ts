import * as core from '@actions/core'
import * as os from 'os'

import {installLoft} from './install'

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
}

run()
