import { createMockClient } from 'cozy-client'

import { getFilteredStoreUrl } from './store'

describe('getFilteredStoreUrl', () => {
  it('should return correct store url', () => {
    const protocol = 'https'
    const subdomain = 'john'
    const domain = 'mycozy.cloud'

    const client = createMockClient({
      clientOptions: {
        uri: `${protocol}://${subdomain}.${domain}/`
      }
    })

    const nativePath = '#/discover/?type=konnector&doctype=io.cozy.contacts'

    const test = decodeURIComponent(getFilteredStoreUrl(client))
    const expected = `${protocol}://${subdomain}-store.${domain}/${nativePath}`

    expect(test).toEqual(expected)
  })
})
