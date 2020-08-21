import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { sortLastNameFirst, buildLastNameFirst } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import withModal from '../HOCs/withModal'
import ContactCardModal from '../Modals/ContactCardModal'
import withSelection from '../Selection/selectionContainer'

class ContactsList extends Component {
  render() {
    const {
      clearSelection,
      contacts,
      selection,
      showModal,
      selectAll,
      t
    } = this.props

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const allContactsSelected = contacts.length === selection.length
      const sortedContacts = [...contacts].sort(sortLastNameFirst)
      const categorizedContacts = sortedContacts.reduce((acc, contact) => {
        const name = buildLastNameFirst(contact)
        const header = name[0] ? name[0].toUpperCase() : t('empty-list')
        acc[header] = acc[header] || []
        acc[header].push(contact)
        return acc
      }, {})
      return (
        <div className="index-list-wrapper u-flex u-flex-row u-flex-column-t">
          <div className="index-wrapper u-pv-2 u-pl-2">
            <div className="index-contacts u-pos-fixed u-pos-static-t">
              {Object.keys(categorizedContacts).map((header, index) => {
                const emptyHeader = header.length > 1
                return (
                  <Fragment key={`link-${header}`}>
                    <a
                      href={`#${header}`}
                      className={`u-db ${
                        emptyHeader ? 'u-dn' : 'u-di'
                      }-t u-mv-half u-ml-half-t`}
                    >
                      {emptyHeader ? <Icon icon="up" /> : header}
                    </a>
                    {index === 13 && <br className="u-dn u-di-t" />}
                  </Fragment>
                )
              })}
            </div>
          </div>
          <div className="list-wrapper">
            {flag('select-all-contacts') && (
              <div>
                <Button
                  label={
                    allContactsSelected ? t('unselect-all') : t('select-all')
                  }
                  theme="secondary"
                  onClick={() =>
                    allContactsSelected ? clearSelection() : selectAll(contacts)
                  }
                />
              </div>
            )}
            <ol className="list-contact">
              {Object.keys(categorizedContacts).map(header => (
                <li id={header} key={`cat-${header}`}>
                  <ContactHeaderRow key={header} header={header} />
                  <ol className="sublist-contact">
                    {categorizedContacts[header].map(contact => (
                      <li key={`contact-${contact._id}`}>
                        <ContactRow
                          id={contact._id}
                          key={contact._id}
                          contact={contact}
                          onClick={() =>
                            showModal(
                              <ContactCardModal
                                onClose={this.hideContactCard}
                                id={contact._id}
                              />
                            )
                          }
                        />
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )
    }
  }
}
ContactsList.propTypes = {
  showModal: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default translate()(withModal(withSelection(ContactsList)))
