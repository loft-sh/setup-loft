import {describe, expect, test} from '@jest/globals'

import {loginToLoft} from '../src/login'

describe('loginToLoft(url: string, accessKey: string)', () => {
  test('with empty url', async () => {
    await expect(loginToLoft('', 'foo', false)).rejects.toThrow(
      'No Loft url provided'
    )
  })

  test('with invalid url', async () => {
    await expect(loginToLoft('$url', 'foo', false)).rejects.toThrow(
      'Invalid Loft url provided'
    )
  })

  test('with empty accessKey', async () => {
    await expect(
      loginToLoft('https://prod.loft.rocks', '', false)
    ).rejects.toThrow('No Loft access key provided')
  })
})
