import * as core from '@actions/core'
import * as io from '@actions/io'
import {homedir} from 'os'
import path from 'path'

async function run(): Promise<void> {
  try {
    core.startGroup('Remove Loft Configuration')
    const homeDir = homedir()
    await io.rmRF(path.join(homeDir, '.loft'))
  } catch (error) {
    core.setFailed(error.message)
  } finally {
    core.endGroup()
  }
}

run()
