import PropTypes from 'prop-types'

export const fieldInputAttributes = PropTypes.shape({
  name: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  hasLabel: PropTypes.bool,
  isArray: PropTypes.bool,
  subFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      type: PropTypes.string.isRequired
    })
  ),
  select: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  labelProps: PropTypes.shape({
    shrink: PropTypes.bool
  })
})
