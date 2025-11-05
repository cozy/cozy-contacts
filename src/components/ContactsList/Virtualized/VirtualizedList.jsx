import flow from 'lodash/flow'
import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import { splitFilename } from 'cozy-client/dist/models/file'
import { makeActions } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'
import { addToFavorites } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/addToFavorites'
import { removeFromFavorites } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/removeFromFavorites'
import VirtualizedTable from 'cozy-ui/transpiled/react/Table/Virtualized'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { edit } from '@/components/Actions/edit'
import { trash } from '@/components/Actions/trash'
import { view } from '@/components/Actions/view'
import Cell from '@/components/ContactsList/Virtualized/Cell'
import { makeColumns } from '@/components/ContactsList/Virtualized/helpers'
import withModalContainer from '@/components/HOCs/withModal'
import withSelection from '@/components/Selection/selectionContainer'
import {
  makeGroupLabelsAndCounts,
  categorizeContacts
} from '@/helpers/contactList'

const VirtualizedList = ({
  contacts,
  showModal,
  hideModal,
  selection,
  clearSelection,
  toggleSelection,
  selectAll
}) => {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const client = useClient()

  const categorizedContacts = categorizeContacts(contacts, t)
  const flattenCategorizedContacts = Object.values(categorizedContacts).flatMap(
    el => el
  )
  const columns = makeColumns({ t, isMobile })
  const isSelectionEnabled = selection.length > 0
  const actions = makeActions(
    [view, edit, addToFavorites, removeFromFavorites, trash],
    {
      selection,
      clearSelection,
      showModal,
      hideModal,
      client,
      t,
      isMobile,
      splitFilename
    }
  )

  return (
    <VirtualizedTable
      rows={flattenCategorizedContacts}
      columns={columns}
      groups={data => makeGroupLabelsAndCounts(data, t)}
      selectedItems={selection}
      isSelectedItem={contact => selection.some(s => s.id === contact._id)}
      onSelect={toggleSelection}
      onSelectAll={selectAll}
      componentsProps={{
        rowContent: {
          children: <Cell actions={actions} />,
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

export default flow(withModalContainer, withSelection)(VirtualizedList)
