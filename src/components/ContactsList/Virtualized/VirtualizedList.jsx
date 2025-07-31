import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import VirtualizedTable from 'cozy-ui/transpiled/react/Table/Virtualized'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Cell from '@/components/ContactsList/Virtualized/Cell'
import { makeColumns } from '@/components/ContactsList/Virtualized/helpers'
import withSelection from '@/components/Selection/selectionContainer'
import { makeGroupLabelsAndCounts } from '@/helpers/contactList'

const VirtualizedList = ({
  contacts,
  selection,
  toggleSelection,
  selectAll
}) => {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()

  const columns = makeColumns({ t, isMobile })
  const isSelectionEnabled = selection.length > 0

  return (
    <VirtualizedTable
      rows={contacts}
      columns={columns}
      groups={data => makeGroupLabelsAndCounts(data, t)}
      defaultOrder="indexes.byFamilyNameGivenNameEmailCozyUrl"
      selectedItems={selection}
      isSelectedItem={contact => selection.some(s => s.id === contact._id)}
      onSelect={toggleSelection}
      onSelectAll={selectAll}
      componentsProps={{
        rowContent: {
          children: <Cell />,
          onLongPress: contact => toggleSelection(contact),
          onClick: contact =>
            isSelectionEnabled
              ? toggleSelection(contact)
              : navigate(`/${contact._id}`)
        }
      }}
    />
  )
}

VirtualizedList.propTypes = {
  contacts: PropTypes.array.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  selectAll: PropTypes.func.isRequired
}

export default withSelection(VirtualizedList)
