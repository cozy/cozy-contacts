import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import SelectBox from 'cozy-ui/transpiled/react/SelectBox'
import Overlay from 'cozy-ui/transpiled/react/Overlay'

import ControlDefault from './SelectBox/ControlDefault'
import Menu from './SelectBox/Menu'
import MenuList from './SelectBox/MenuList'
import Option from './SelectBox/Option'
import SelectContainer from './SelectBox/SelectContainer'

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

  toggleMenu = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }))
  }
  forceMenuOpen = () => this.setState({ menuIsOpen: true })
  setEditedGroupId = id => this.setState({ editedGroupId: id })

  render() {
    const {
      value,
      allGroups,
      onChange,
      createGroup,
      deleteGroup,
      renameGroup,
      styles,
      control,
      isMulti,
      noOptionsMessage,
      preliminaryOptions
    } = this.props
    const { menuIsOpen, editedGroupId } = this.state

    const options = preliminaryOptions.concat(allGroups)

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
          isMulti={isMulti}
          menuIsOpen={menuIsOpen}
          blurInputOnSelect={true}
          hideSelectedOptions={false}
          isSearchable={false}
          isClearable={false}
          closeMenuOnSelect={false}
          tabSelectsValue={false}
          onKeyDown={captureEscapeEvent}
          noOptionsMessage={noOptionsMessage}
          options={options}
          value={value}
          onChange={onChange}
          getOptionLabel={group => group.name}
          getOptionValue={group => group._id}
          components={{
            Control: control ? control : ControlDefault,
            Menu,
            MenuList,
            Option,
            SelectContainer
          }}
          createGroup={createGroup}
          deleteGroup={deleteGroup}
          renameGroup={renameGroup}
          styles={styles}
          toggleMenu={this.toggleMenu}
          setEditedGroupId={this.setEditedGroupId}
          editedGroupId={editedGroupId}
        />
      </>
    )
  }
}

ContactGroupManager.propTypes = {
  // for multiple selections, value can an array
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  allGroups: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  control: PropTypes.func,
  isMulti: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  preliminaryOptions: PropTypes.array
}

ContactGroupManager.defaultProps = {
  isMulti: false,
  preliminaryOptions: []
}

export default ContactGroupManager
