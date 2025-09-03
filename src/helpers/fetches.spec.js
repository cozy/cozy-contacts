import CozyClient from 'cozy-client'
import { updateIndexFullNameAndDisplayName } from 'cozy-client/dist/models/contact'
import { johnDoeContact } from 'cozy-ui/transpiled/react/Contacts/AddModal/mocks'

import {
  fetchContactsToUpdateAndUpdateWith,
  fetchNormalizedServiceByName
} from './fetches'

const log = (type, message) => message

const client = new CozyClient({})

describe('fetchContactsToUpdateAndUpdateWith', () => {
  it('should returns only the updated contact', async () => {
    const lastSuccess = new Date()
    const contactToUpdate = johnDoeContact
    const contactUpToDate = updateIndexFullNameAndDisplayName(johnDoeContact)
    const callback = contact => updateIndexFullNameAndDisplayName(contact)
    const queryResult = [contactToUpdate, contactUpToDate]
    client.queryAll = jest.fn().mockResolvedValue(queryResult)

    const expected = [contactUpToDate]
    expect(
      await fetchContactsToUpdateAndUpdateWith({
        client,
        log,
        date: lastSuccess,
        callback
      })
    ).toEqual(expected)
  })

  it('should returns updated contact even if lastSuccess is undefined', async () => {
    const lastSuccess = undefined
    const contactToUpdate = johnDoeContact
    const contactUpToDate = updateIndexFullNameAndDisplayName(johnDoeContact)
    const callback = contact => updateIndexFullNameAndDisplayName(contact)
    const queryResult = [contactToUpdate, contactUpToDate]
    client.queryAll = jest.fn().mockResolvedValue(queryResult)

    const expected = [contactUpToDate]
    expect(
      await fetchContactsToUpdateAndUpdateWith({
        client,
        log,
        date: lastSuccess,
        callback
      })
    ).toEqual(expected)
  })
})

describe('fetchNormalizedServiceByName', () => {
  it('should fetch a normalized service', async () => {
    const trigger = {
      data: [
        {
          id: '6e0847f496cbeb11e3ed653f170086bd'
        }
      ]
    }
    const normalizedTrigger = {
      data: {
        id: '6e0847f496cbeb11e3ed653f170086bd',
        current_state: {
          last_success: '2020-08-12T11:14:46.060006+02:00'
        }
      }
    }

    client.query = jest
      .fn()
      .mockReturnValueOnce(trigger)
      .mockReturnValueOnce(normalizedTrigger)

    const expected = {
      id: '6e0847f496cbeb11e3ed653f170086bd',
      current_state: { last_success: '2020-08-12T11:14:46.060006+02:00' }
    }
    expect(await fetchNormalizedServiceByName(client, 'serviceName')).toEqual(
      expected
    )
  })

  it('should return null if no trigger found', async () => {
    const trigger = {
      data: []
    }

    client.query = jest.fn().mockReturnValueOnce(trigger)

    expect(await fetchNormalizedServiceByName(client, 'serviceName')).toEqual(
      null
    )
  })

  it('should return null if query returns undefined', async () => {
    const trigger = undefined

    client.query = jest.fn().mockReturnValueOnce(trigger)

    expect(await fetchNormalizedServiceByName(client, 'serviceName')).toEqual(
      null
    )
  })

  it('should return null if no normalized trigger found', async () => {
    const trigger = {
      data: [
        {
          id: '6e0847f496cbeb11e3ed653f170086bd'
        }
      ]
    }

    const normalizedTrigger = null

    client.query = jest
      .fn()
      .mockReturnValueOnce(trigger)
      .mockReturnValueOnce(normalizedTrigger)

    expect(await fetchNormalizedServiceByName(client, 'serviceName')).toEqual(
      null
    )
  })
})
