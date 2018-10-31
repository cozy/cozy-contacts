import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Button } from 'cozy-ui/transpiled/react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import SelectBox, { CheckboxOption } from 'cozy-ui/transpiled/react/SelectBox'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'

import IconGroups from '../../assets/icons/groups.svg'
import IconDown from '../../assets/icons/down.svg'
import ContactGroupCreation from './ContactGroupCreation'

const MainButton = ({ t, selectProps: { toggleMenuIsOpen } }) => {
  return (
    <Button
      theme="secondary"
      size="small"
      icon={<Icon icon={IconGroups} color={palette['coolGrey']} />}
      label={t('groups.manage')}
      onClick={() => {
        toggleMenuIsOpen()
      }}
    >
      <Icon
        icon={IconDown}
        color={palette['coolGrey']}
        width="12"
        className="group-manager__indicator"
      />
    </Button>
  )
}

MainButton.propTypes = {
  t: PropTypes.func.isRequired
}

const MainButtonWithTranslation = translate()(MainButton)

const MainButtonControl = props => <MainButtonWithTranslation {...props} />
const customStyles = {
  container: base => ({
    ...base,
    display: 'inline-block',
    verticalAlign: 'middle',
    zIndex: 100000
  }),
  menu: base => ({
    ...base
  }),
  noOptionsMessage: () => ({}),
  option: base => ({
    ...base,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })
}

const captureEscapeEvent = e => {
  if (e.key === 'Escape') {
    e.stopPropagation()
    e.target.blur()
  }
}

const MenuWithFixedComponent = props => {
  const { children } = props
  const { createGroup, toggleMenuIsOpen } = props.selectProps
  return (
    <components.Menu {...props}>
      {children}
      <ContactGroupCreation
        createGroup={createGroup}
        toggleMenuIsOpen={toggleMenuIsOpen}
      />
    </components.Menu>
  )
}
class ContactGroupManager extends Component {
  state = {
    menuIsOpen: false
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allGroups.length !== this.props.allGroups.length) {
      document.getElementsByClassName('react-select__menu-list')[0].scrollTop =
        '9999'
    }
  }
  toggleMenuIsOpen = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }))
  }

  forceMenuOpen = () => this.setState({ menuIsOpen: true })

  render() {
    const {
      contactGroups,
      allGroups,
      onGroupSelectionChange,
      createGroup,
      t
    } = this.props

    return (
      <>
        {this.state.menuIsOpen && (
          <Overlay
            className={classNames('overlay-creation-group')}
            onClick={this.toggleMenuIsOpen}
          />
        )}
        <SelectBox
          classNamePrefix="react-select"
          isMulti
          menuIsOpen={this.state.menuIsOpen}
          blurInputOnSelect={true}
          hideSelectedOptions={false}
          isSearchable={false}
          closeMenuOnSelect={false}
          tabSelectsValue={false}
          onKeyDown={captureEscapeEvent}
          noOptionsMessage={() => t('groups.none')}
          options={allGroups}
          value={contactGroups}
          onChange={onGroupSelectionChange}
          getOptionLabel={group => group.name}
          getOptionValue={group => group._id}
          components={{
            Option: CheckboxOption,
            Control: MainButtonControl,
            Menu: MenuWithFixedComponent
          }}
          createGroup={createGroup}
          styles={customStyles}
          toggleMenuIsOpen={this.toggleMenuIsOpen}
        />
      </>
    )
  }
}
ContactGroupManager.propTypes = {
  contactGroups: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired,
  onGroupSelectionChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default translate()(ContactGroupManager)
