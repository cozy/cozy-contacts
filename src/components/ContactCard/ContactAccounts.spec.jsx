import React from 'react'
import renderer from 'react-test-renderer'
import ContactAccounts from './ContactAccounts'
import AppLike from '../../tests/Applike'

describe('ContactAccounts component', () => {
  it('should render a list of contact accounts', () => {
    const props = {
      accounts: [
        {
          id: '505ec401-1302-4073-b41d-aee2d0f4dcbd',
          name: 'john.doe@gmail.com',
          type: 'konnector-google'
        }
      ]
    }
    const tree = renderer
      .create(
        <AppLike>
          <ContactAccounts {...props} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
