import {expect, test} from '@jest/globals'

import {binaryName, binaryUrl, isWindows} from '../src/install'

test('isWindows(platform: string)', () => {
  expect(isWindows('win32')).toEqual(true)
  expect(isWindows('darwin')).toEqual(false)
  expect(isWindows('linux')).toEqual(false)
})

test('binaryName(platform: string)', () => {
  expect(binaryName('win32')).toEqual('loft.exe')
  expect(binaryName('darwin')).toEqual('loft')
  expect(binaryName('linux')).toEqual('loft')
})

test('binaryUrl(platform: string, architecture: string, version: string)', () => {
  expect(binaryUrl('darwin', 'arm64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-darwin-arm64'
  )
  expect(binaryUrl('darwin', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-darwin-amd64'
  )
  expect(binaryUrl('darwin', 'x64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-darwin-amd64'
  )
  expect(binaryUrl('darwin', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-darwin-amd64'
  )
  expect(binaryUrl('darwin', 'amd64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-darwin-amd64'
  )

  expect(binaryUrl('linux', 'arm64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-linux-arm64'
  )
  expect(binaryUrl('linux', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-linux-amd64'
  )
  expect(binaryUrl('linux', 'x64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-linux-amd64'
  )
  expect(binaryUrl('linux', 'amd64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-linux-amd64'
  )

  expect(binaryUrl('win32', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-windows-amd64.exe'
  )
  expect(binaryUrl('win32', 'amd64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-windows-amd64.exe'
  )
  expect(binaryUrl('win32', 'x64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/loft/releases/download/v5.14.4/loft-windows-amd64.exe'
  )

  expect(binaryUrl('darwin', 'amd64', 'latest')).resolves.toMatch(
    /https\:\/\/github.com\/loft\-sh\/loft\/releases\/download\/v\d+\.\d+\.\d+(\-.*)?\/loft\-darwin\-amd64/
  )
  expect(binaryUrl('linux', 'amd64', 'latest')).resolves.toMatch(
    /https\:\/\/github.com\/loft\-sh\/loft\/releases\/download\/v\d+\.\d+\.\d+(\-.*)?\/loft\-linux\-amd64/
  )
  expect(binaryUrl('win32', 'amd64', 'latest')).resolves.toMatch(
    /https\:\/\/github.com\/loft\-sh\/loft\/releases\/download\/v\d+\.\d+\.\d+(\-.*)?\/loft\-windows\-amd64/
  )
})
