import {expect, test} from '@jest/globals'

import {binaryUrl} from '../src/loft'

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
