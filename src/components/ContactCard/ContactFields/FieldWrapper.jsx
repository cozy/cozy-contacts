import PropTypes from 'prop-types'
import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import FieldByType from './FieldByType'
import { makeTLabel } from './helpers'

const FieldWrapper = ({ type, value }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const label = value.label || null

  return (
    <div className="u-mb-half u-breakword u-fz-medium">
      <FieldByType value={value} type={type} />
      {label && (
        <>
          <span className="u-ph-half u-dn-s">·</span>
          <Typography display={isMobile ? 'block' : 'inline'} variant="body2">
            {makeTLabel({ type, value, t })}
          </Typography>
        </>
      )}
    </div>
  )
}

FieldWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
}

export default FieldWrapper
