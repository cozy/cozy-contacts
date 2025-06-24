import React, { forwardRef } from 'react'

import Paper from 'cozy-ui/transpiled/react/Paper'
import Table from 'cozy-ui/transpiled/react/Table'
import TableBody from 'cozy-ui/transpiled/react/TableBody'
import TableContainer from 'cozy-ui/transpiled/react/TableContainer'
import TableFooter from 'cozy-ui/transpiled/react/TableFooter'
import TableHead from 'cozy-ui/transpiled/react/TableHead'
import TableRow from 'cozy-ui/transpiled/react/TableRow'

const _TableContainer = forwardRef((props, ref) => (
  <TableContainer
    {...props}
    ref={ref}
    component={Paper}
    style={{ zIndex: 'var(--zIndex-app)', ...props.style }}
    elevation={0}
  />
))
_TableContainer.displayName = '_TableContainer'

const virtuosoComponents = {
  Scroller: forwardRef(({ context, ...props }, ref) => {
    return <_TableContainer {...props} ref={ref} />
  }),
  Table: forwardRef((props, ref) => <Table {...props} ref={ref} />),
  TableHead: forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  TableFooter: forwardRef((props, ref) => <TableFooter {...props} ref={ref} />),
  TableRow: forwardRef(({ item, context, ...props }, ref) => {
    const isSelected = context?.isSelectedItem(item)
    const isDisabled = context?.itemsInDropProcess.includes(item._id)

    return <TableRow {...props} ref={ref} selected={isSelected} hover />
  })
}

export default virtuosoComponents
