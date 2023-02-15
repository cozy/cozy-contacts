import PropTypes from 'prop-types'

export const fieldInputAttributes = PropTypes.shape({
  type: PropTypes.string,
  select: PropTypes.bool,
  selectValue: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  labelProps: PropTypes.shape({
    shrink: PropTypes.bool
  })
})
