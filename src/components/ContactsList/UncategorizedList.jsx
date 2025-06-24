import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getInitials } from 'cozy-client/dist/models/contact'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import ContactIdentity from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactIdentity'
import ContactName from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactName'
import List from 'cozy-ui/transpiled/react/List'
import VirtualizedTable from 'cozy-ui/transpiled/react/Table/Virtualized'
import { Table } from 'cozy-ui/transpiled/react/deprecated/Table'

import ContactsSubList from './ContactsSubList'
import withSelection from '../Selection/selectionContainer'

import { getAppI18n } from '@/locales'

const Cell = ({ row, column, cell }) => {
  if (column.id === 'fullname') {
    return <ContactIdentity contact={row} noWrapper />

    return (
      <>
        <Avatar display="inline" size="s">
          {getInitials(row)}
        </Avatar>
        <ContactName contact={row} />
      </>
    )
  }

  return cell
}

const CellMemo = React.memo(Cell)

const makeColumns = () => {
  const { t } = getAppI18n()

  return [
    {
      id: 'fullname',
      disablePadding: true,
      label: t('fields.familyName'),
      width: '45%'
    },
    {
      id: 'email.[0].address',
      disablePadding: false,
      label: t('fields.email'),
      textAlign: 'left',
      width: '30%'
    },
    {
      id: 'phone.[0].number',
      disablePadding: false,
      label: t('fields.phone'),
      textAlign: 'left',
      width: '25%'
    }
  ]
}

const UncategorizedList = ({
  contacts,
  selection,
  toggleSelection,
  selectAll
}) => {
  const columns = makeColumns()
  const navigate = useNavigate()

  return (
    <VirtualizedTable
      rows={contacts}
      columns={columns}
      defaultOrder={columns[0].id}
      selectedItems={selection}
      isSelectedItem={contact => selection.some(s => s.id === contact._id)}
      onSelect={toggleSelection}
      onSelectAll={selectAll}
      componentsProps={{
        rowContent: {
          children: <CellMemo />,
          onClick: contact => navigate(`/${contact._id}`)
        }
      }}
    />
  )

  return (
    <Table>
      <List key="no-category">
        <ContactsSubList contacts={contacts} />
      </List>
    </Table>
  )
}

UncategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  selectAll: PropTypes.func.isRequired
}

export default withSelection(UncategorizedList)
