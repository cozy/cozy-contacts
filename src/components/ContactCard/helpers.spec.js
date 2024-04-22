import { handleContactFieldInputProps } from './helpers'

describe('handleContactFieldInputProps', () => {
  it('should return original props when isAddressField is false', () => {
    const props = { prop1: 'value1', prop2: 'value2' }
    const opts = {
      name: 'email',
      setIsAddressDialogOpen: jest.fn()
    }

    const result = handleContactFieldInputProps(props, opts)

    expect(result).toEqual(props)
  })

  it('should return modified props when isAddressField is true', () => {
    const props = { prop1: 'value1', prop2: 'value2' }
    const setIsAddressDialogOpen = jest.fn()
    const opts = {
      name: 'address',
      setIsAddressDialogOpen
    }

    const result = handleContactFieldInputProps(props, opts)

    expect(result).not.toEqual(props)
    expect(result.onClick).toBeDefined()
    expect(result.inputProps).toBeDefined()
    expect(setIsAddressDialogOpen).not.toHaveBeenCalled()

    result.onClick()

    expect(setIsAddressDialogOpen).toHaveBeenCalled()
  })
})
