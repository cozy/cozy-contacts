import { createMockClient } from 'cozy-client'

import { getFilteredStoreUrl } from './StoreButton'

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

    const universalLink =
      'https://links.mycozy.cloud/store/discover/?type=konnector&doctype=io.cozy.contacts'
    const nativePath = '#/discover/?type=konnector&doctype=io.cozy.contacts'

    const test = decodeURIComponent(getFilteredStoreUrl(client))
    const expected = `${universalLink}&fallback=${protocol}://${subdomain}-store.${domain}/${nativePath}`

    expect(test).toEqual(expected)
  })
})
