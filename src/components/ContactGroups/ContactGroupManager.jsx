import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'
import Overlay from 'cozy-ui/transpiled/react/Overlay'

import Control from './SelectBox/Control'
import Menu from './SelectBox/Menu'
import MenuList from './SelectBox/MenuList'
import Option from './SelectBox/Option'
import SelectContainer from './SelectBox/SelectContainer'

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

class ContactGroupManager extends Component {
  state = {
    menuIsOpen: false,
    editedGroupId: ''
  }

  componentDidMount() {
    this.menuRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allGroups.length !== this.props.allGroups.length &&
      this.menuRef.current
    ) {
      ReactDOM.findDOMNode(this.menuRef.current).scrollTop = '9999' // eslint-disable-line react/no-find-dom-node
    }
  }

  toggleMenu = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }))
  }
  forceMenuOpen = () => this.setState({ menuIsOpen: true })
  setEditedGroupId = id => this.setState({ editedGroupId: id })

  render() {
    const {
      contactGroups,
      allGroups,
      onGroupSelectionChange,
      createGroup,
      deleteGroup,
      renameGroup,
      t
    } = this.props
    const { menuIsOpen, editedGroupId } = this.state

    return (
      <>
        {menuIsOpen && (
          <Overlay
            className={classNames('overlay-creation-group')}
            onClick={this.toggleMenu}
          />
        )}
        <SelectBox
          classNamePrefix="react-select"
          isMulti
          menuIsOpen={menuIsOpen}
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
          menuRef={this.menuRef}
          components={{
            Control,
            Menu,
            MenuList,
            Option,
            SelectContainer
          }}
          createGroup={createGroup}
          deleteGroup={deleteGroup}
          renameGroup={renameGroup}
          styles={customStyles}
          toggleMenu={this.toggleMenu}
          setEditedGroupId={this.setEditedGroupId}
          editedGroupId={editedGroupId}
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
