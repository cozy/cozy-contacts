import React from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'
import cx from 'classnames'

import { withClient } from 'cozy-client'
import Overlay from 'cozy-ui/transpiled/react/Overlay'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'

import SelectedLetterContext from '../Contexts/SelectedLetter'

import CustomMenu from './SelectBox/Menu'
import CustomSelectContainer from './SelectBox/SelectContainer'

const captureEscapeEvent = e => {
  if (e.key === 'Escape') {
    e.stopPropagation()
    e.target.blur()
  }
}
export class LetterSelectClass extends React.Component {
  static contextType = SelectedLetterContext
  state = {
    menuIsOpen: false,
    editedLetterId: ''
  }

  toggleMenu = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }))
  }

  closeMenu = () => {
    this.setState({ menuIsOpen: false })
  }

  handleChange = props => {
    const { onChange, closeMenuOnSelect } = this.props

    if (closeMenuOnSelect) {
      this.closeMenu()
    }

    onChange(props)
  }

  render() {
    const {
      value,
      allLetters,
      styles,
      noOptionsMessage,
      components,
      className,
      closeMenuOnSelect,
      menuPosition
    } = this.props
    const { menuIsOpen, editedLetterId } = this.state
    const { toggleMenu, handleChange } = this

    const defaultComponents = {
      Menu: CustomMenu,
      SelectContainer: CustomSelectContainer
    }

    return (
      <div className={cx('u-flex-auto u-w-100', className)}>
        {menuIsOpen && (
          <Overlay className="overlay-creation-group" onClick={toggleMenu} />
        )}
        <SelectBox
          classNamePrefix="react-select"
          isMulti={false}
          withCheckbox={false}
          menuIsOpen={menuIsOpen}
          blurInputOnSelect={true}
          hideSelectedOptions={false}
          isSearchable={false}
          isClearable={false}
          closeMenuOnSelect={closeMenuOnSelect}
          tabSelectsValue={false}
          onKeyDown={captureEscapeEvent}
          noOptionsMessage={noOptionsMessage}
          options={allLetters}
          value={value}
          onChange={handleChange}
          getOptionLabel={letter => letter.name}
          getOptionValue={letter => letter._id}
          components={{ ...defaultComponents, ...components }}
          styles={styles}
          onControlClicked={toggleMenu}
          editedLetterId={editedLetterId}
          menuPosition={menuPosition}
        />
      </div>
    )
  }
}

LetterSelectClass.propTypes = {
  allLetters: PropTypes.array.isRequired,
  styles: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  // for multiple selections, value can be an array
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  // to customize react-select elements
  components: PropTypes.object,
  // noOptionsMessage is used to show a message when there is no options in the menu list
  noOptionsMessage: PropTypes.func,
  className: PropTypes.string,
  closeMenuOnSelect: PropTypes.bool,
  menuPosition: PropTypes.oneOf(['fixed', 'absolute']),
  refs: PropTypes.object.isRequired
}

LetterSelectClass.defaultProps = {
  isMulti: false,
  components: {},
  closeMenuOnSelect: false
}

const LetterSelect = flow(
  withClient
)(LetterSelectClass)

LetterSelect.propTypes = {
  allLetters: PropTypes.array.isRequired
}

export default LetterSelect
