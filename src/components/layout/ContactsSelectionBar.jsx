import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { SelectionBar, Modal } from 'cozy-ui/react'
import withSelection from '../Selection/selectionContainer'
import withModalContainer from '../HOCs/withModal'
import { translate } from 'cozy-ui/transpiled/react/I18n'

class ContactsSelectionBar extends Component {
  render() {
    const {
      selection,
      clearSelection,
      trashAction,
      showModal,
      t,
      hideModal
    } = this.props
    return selection.length > 0 ? (
      <SelectionBar
        selected={selection}
        hideSelectionBar={clearSelection}
        actions={{
          trash: {
            action: () => {
              showModal(
                <Modal
                  into="body"
                  title={t('delete-confirmation.title', {
                    smart_count: selection.length
                  })}
                  description={t('delete-confirmation.description', {
                    smart_count: selection.length
                  })}
                  primaryText={t('delete')}
                  primaryType="danger"
                  primaryAction={async () => {
                    await Promise.all(selection.map(trashAction))
                    clearSelection()
                    hideModal()
                  }}
                  secondaryText={t('cancel')}
                  secondaryAction={() => hideModal()}
                  dismissAction={hideModal}
                />
              )
            }
          }
        }}
      />
    ) : null
  }
}
ContactsSelectionBar.propTypes = {
  selection: PropTypes.array.isRequired,
  clearSelection: PropTypes.func.isRequired,
  trashAction: PropTypes.func.isRequired
}

export default translate()(
  withModalContainer(withSelection(ContactsSelectionBar))
)
