import React from 'react'
import { PropTypes } from 'prop-types'
import { Alerter } from 'cozy-ui/transpiled/react'
import { Main, Content, Layout } from 'cozy-ui/transpiled/react/Layout'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import ContactsList from './ContactsList'
import { IconSprite } from 'cozy-ui/transpiled/react'
import 'cozy-ui/transpiled/stylesheet.css'
import connect from '../connections/allContacts'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import flag, { FlagSwitcher } from 'cozy-flags'
import { initFlags } from '../helpers/flags'

class ContactsApp extends React.Component {
  componentWillMount() {
    initFlags()
  }

  render() {
    const { t } = this.props
    return (
      <Layout monocolumn="true">
        <Main>
          {flag('switcher') && <FlagSwitcher />}
          <ContactsSelectionBar trashAction={this.props.deleteContact} />
          <Header right={<Toolbar />} />
          <Content>
            <ContactsList />
          </Content>
          <Alerter t={t} />
          <ModalManager />
        </Main>
        <IconSprite />
      </Layout>
    )
  }
}
ContactsApp.propTypes = {
  deleteContact: PropTypes.func.isRequired
}


export default translate()(connect(ContactsApp))
