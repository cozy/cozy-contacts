import PropTypes from 'prop-types'

export const fieldInputAttributes = PropTypes.shape({
  name: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    )
  }),
  isArray: PropTypes.bool,
  subFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      type: PropTypes.string.isRequired
    })
  ),
  labelProps: PropTypes.shape({
    shrink: PropTypes.bool
  })
})
