import React, { useState, forwardRef, useEffect } from 'react'
import { TableVirtuoso } from 'react-virtuoso'

import FixedHeaderContent from 'cozy-ui/transpiled/react/Table/Virtualized/FixedHeaderContent'
import RowContent from 'cozy-ui/transpiled/react/Table/Virtualized/RowContent'
import {
  stableSort,
  getComparator
} from 'cozy-ui/transpiled/react/Table/Virtualized/helpers'

// import Toto from './Toto'
import virtuosoComponents from './virtuosoComponents'
const Toto = React.lazy(() => import('./Toto'))

const VirtualizedTable = forwardRef(
  (
    {
      rows,
      columns,
      defaultOrder,
      secondarySort,
      selectedItems = [],
      onSelect = () => {},
      onSelectAll = () => {},
      isSelectedItem = () => {},
      componentsProps,
      dragProps,
      ...props
    },
    ref
  ) => {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState(defaultOrder)
    const [itemsInDropProcess, setItemsInDropProcess] = useState([]) // array of Ids, for dragndrop feature

    const sortedData = stableSort(rows, getComparator(order, orderBy))
    const data = secondarySort ? secondarySort(sortedData) : sortedData

    const handleSort = property => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    }

    const handleSelectAll = event => {
      if (event?.target?.checked) {
        onSelectAll(rows)
        return
      }
      onSelectAll([])
    }

    return (
      <TableVirtuoso
        {...props}
        ref={ref}
        data={data}
        context={{
          isSelectedItem,
          selectedItems,
          dragProps,
          itemsInDropProcess,
          setItemsInDropProcess
        }}
        components={virtuosoComponents}
        fixedHeaderContent={() => (
          <FixedHeaderContent
            columns={columns}
            rowCount={rows.length}
            selectedCount={selectedItems.length}
            order={order}
            orderBy={orderBy}
            onClick={handleSort}
            onSelectAllClick={handleSelectAll}
          />
        )}
        itemContent={(_index, row) => (
          <RowContent
            index={_index}
            row={row}
            columns={columns}
            isSelectedItem={isSelectedItem}
            onSelectClick={onSelect}
          >
            {componentsProps?.rowContent?.children}
          </RowContent>
        )}
        rowSpan={2}
      />
    )
  }
)

VirtualizedTable.displayName = 'VirtualizedTable'

const VirtuosoTableWrapper = props => {
  const isDND = props.dragProps?.enabled || false

  if (isDND) {
    return <VirtualizedTable {...props} />
  } else {
    return (
      <React.Suspense>
        <Toto />
      </React.Suspense>
    )
  }
}

export default VirtuosoTableWrapper
