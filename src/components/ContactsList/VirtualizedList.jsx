import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import ContactIdentity from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactIdentity'
import VirtualizedTable from 'cozy-ui/transpiled/react/Table/Virtualized'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import withSelection from '@/components/Selection/selectionContainer'

const Cell = ({ row, column, cell }) => {
  if (column.id === 'fullname') {
    return <ContactIdentity contact={row} noWrapper />
  }

  return cell
}

const CellMemo = React.memo(Cell)

const makeColumns = ({ t, isMobile }) => {
  const mobileColumns = [
    {
      id: 'fullname',
      label: t('fields.familyName'),
      width: '100%',
      sortable: false
    }
  ]

  if (isMobile) {
    return mobileColumns
  }

  return [
    {
      id: 'fullname',
      disablePadding: true,
      label: t('fields.familyName'),
      width: '45%',
      sortable: false
    },
    {
      id: 'email.[0].address',
      disablePadding: false,
      label: t('fields.email'),
      textAlign: 'left',
      width: '30%',
      sortable: false
    },
    {
      id: 'phone.[0].number',
      disablePadding: false,
      label: t('fields.phone'),
      textAlign: 'left',
      width: '25%',
      sortable: false
    }
  ]
}

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
      defaultOrder="indexes.byFamilyNameGivenNameEmailCozyUrl"
      selectedItems={selection}
      isSelectedItem={contact => selection.some(s => s.id === contact._id)}
      onSelect={toggleSelection}
      onSelectAll={selectAll}
      componentsProps={{
        rowContent: {
          children: <CellMemo />,
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
