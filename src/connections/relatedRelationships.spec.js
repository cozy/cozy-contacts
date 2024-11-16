import {
  getRelatedRelationshipsToUpdate,
  makeRelationMapping,
  isSameRelatedRelationships
} from './relatedRelationships'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'

describe('relatedRelationships', () => {
  describe('getRelatedRelationshipsToUpdate', () => {
    it('should return "null" if oldContact and updatedContact don\'t have related relationships', () => {
      const oldContact = {
        _id: 'contact0',
        name: 'Alice'
      }
      const updatedContact = {
        _id: 'contact0',
        name: 'Alice'
      }

      expect(
        getRelatedRelationshipsToUpdate(oldContact, updatedContact)
      ).toBeNull()
    })

    it('should return "null" if the related relationships of oldContact and updatedContact have not changed.', () => {
      const oldContact = {
        _id: 'contact0',
        name: 'Alice',
        relationships: {
          related: {
            data: [{ _id: 'related0', metadata: { relationTypes: ['spouse'] } }]
          }
        }
      }
      const updatedContact = {
        _id: 'contact0',
        name: 'Alice',
        relationships: {
          related: {
            data: [{ _id: 'related0', metadata: { relationTypes: ['spouse'] } }]
          }
        }
      }

      expect(
        getRelatedRelationshipsToUpdate(oldContact, updatedContact)
      ).toBeNull()
    })

    it('should return new related relationships to update', () => {
      const oldContact = {
        relationships: {
          related: {
            data: [{ _id: 'related0', metadata: { relationTypes: ['friend'] } }]
          }
        }
      }
      const updatedContact = {
        relationships: {
          related: {
            data: [
              { _id: 'related0', metadata: { relationTypes: ['friend'] } },
              { _id: 'related1', metadata: { relationTypes: ['spouse'] } }
            ]
          }
        }
      }

      expect(
        getRelatedRelationshipsToUpdate(oldContact, updatedContact)
      ).toEqual([
        {
          relation: {
            _id: 'related1',
            metadata: { relationTypes: ['spouse'] }
          },
          type: 'CREATE'
        }
      ])
    })

    it('should return updated related relationships to update', () => {
      const oldContact = {
        relationships: {
          related: {
            data: [{ _id: 'related0', metadata: { relationTypes: ['friend'] } }]
          }
        }
      }
      const updatedContact = {
        relationships: {
          related: {
            data: [{ _id: 'related0', metadata: { relationTypes: ['spouse'] } }]
          }
        }
      }

      expect(
        getRelatedRelationshipsToUpdate(oldContact, updatedContact)
      ).toEqual([
        {
          relation: {
            _id: 'related0',
            metadata: { relationTypes: ['spouse'] }
          },
          type: 'UPDATE'
        }
      ])
    })

    it('should return updated related relationships when adding relationTypes', () => {
      const oldContact = {
        relationships: {
          related: {
            data: [{ _id: 'related0', metadata: { relationTypes: ['friend'] } }]
          }
        }
      }
      const updatedContact = {
        relationships: {
          related: {
            data: [
              {
                _id: 'related0',
                metadata: { relationTypes: ['friend', 'spouse'] }
              }
            ]
          }
        }
      }

      expect(
        getRelatedRelationshipsToUpdate(oldContact, updatedContact)
      ).toEqual([
        {
          relation: {
            _id: 'related0',
            metadata: { relationTypes: ['friend', 'spouse'] }
          },
          type: 'UPDATE'
        }
      ])
    })

    it('should return updated related relationships when deleting relationTypes', () => {
      const oldContact = {
        relationships: {
          related: {
            data: [
              {
                _id: 'related0',
                metadata: { relationTypes: ['friend', 'spouse'] }
              }
            ]
          }
        }
      }
      const updatedContact = {
        relationships: {
          related: {
            data: [
              {
                _id: 'related0',
                metadata: { relationTypes: ['friend'] }
              }
            ]
          }
        }
      }

      expect(
        getRelatedRelationshipsToUpdate(oldContact, updatedContact)
      ).toEqual([
        {
          relation: {
            _id: 'related0',
            metadata: { relationTypes: ['friend'] }
          },
          type: 'UPDATE'
        }
      ])
    })

    it('should return removed related relationships to update', () => {
      const oldContact = {
        relationships: {
          related: {
            data: [
              { _id: 'related0', metadata: { relationTypes: ['friend'] } },
              { _id: 'related1', metadata: { relationTypes: ['spouse'] } }
            ]
          }
        }
      }
      const updatedContact = {
        relationships: {
          related: {
            data: [{ _id: 'related0', metadata: { relationTypes: ['friend'] } }]
          }
        }
      }

      expect(
        getRelatedRelationshipsToUpdate(oldContact, updatedContact)
      ).toEqual([
        {
          relation: {
            _id: 'related1',
            metadata: { relationTypes: ['spouse'] }
          },
          type: 'DELETE'
        }
      ])
    })
  })
  describe('isSameRelatedRelationships', () => {
    it('should return true if related relationships are the same', () => {
      const oldContact = {
        _id: 'contact0',
        name: 'Alice',
        relationships: {
          related: {
            data: [{ _id: 'related0' }]
          }
        }
      }
      const updatedContact = {
        _id: 'contact0',
        name: 'Bob',
        relationships: {
          related: {
            data: [{ _id: 'related0' }]
          }
        }
      }

      expect(isSameRelatedRelationships(oldContact, updatedContact)).toBe(true)
    })

    it('should return false if related relationships are different', () => {
      const oldContact = {
        relationships: {
          related: {
            data: [{ _id: 'related0' }]
          }
        }
      }
      const updatedContact = {
        relationships: {
          related: {
            data: [{ _id: 'related1' }]
          }
        }
      }

      expect(isSameRelatedRelationships(oldContact, updatedContact)).toBe(false)
    })
  })
  describe('makeRelationMapping', () => {
    it('should return a mapping of relation types', () => {
      const originalContactId = 'relatedO'
      const originalContactRelation = {
        _id: 'related1',
        metadata: { relationTypes: ['parent'] }
      }

      expect(
        makeRelationMapping(originalContactRelation, originalContactId)
      ).toEqual({
        _id: originalContactId,
        _type: DOCTYPE_CONTACTS,
        metadata: {
          relationTypes: ['child']
        }
      })
    })
  })
})
