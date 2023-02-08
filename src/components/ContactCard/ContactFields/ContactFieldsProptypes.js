import PropTypes from 'prop-types'

export const fieldInputAttributes = PropTypes.shape({
  type: PropTypes.string,
  labelProps: PropTypes.shape({
    shrink: PropTypes.bool
  })
})
