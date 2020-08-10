import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import SelectBox, {
  ActionsOption,
  components
} from 'cozy-ui/transpiled/react/SelectBox'
import Overlay from 'cozy-ui/transpiled/react/Overlay'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import ContactGroupCreation from './ContactGroupCreation'

const MainButton = ({ t, selectProps: { toggleMenuIsOpen } }) => {
  return (
    <Button
      theme="secondary"
      size="small"
      label={t('groups.manage')}
      onClick={() => {
        toggleMenuIsOpen()
      }}
    >
      <Icon
        icon="bottom-select"
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
  const { createGroup, toggleMenuIsOpen, ...selectProps } = props.selectProps
  return (
    <components.Menu {...props} selectProps={selectProps}>
      {children}
      <ContactGroupCreation
        createGroup={createGroup}
        toggleMenuIsOpen={toggleMenuIsOpen}
      />
    </components.Menu>
  )
}

const CustomMenuList = props => {
  const { menuRef, ...selectProps } = props.selectProps

  return <components.MenuList ref={menuRef} {...props} {...selectProps} />
}

const CustomOption = props => (
  <ActionsOption
    {...props}
    withCheckbox
    actions={[
      {
        icon: 'trash',
        onClick: ({ data }) => props.selectProps.deleteGroup(data)
      }
    ]}
  />
)

CustomOption.propTypes = {
  selectProps: PropTypes.shape({
    deleteGroup: PropTypes.func.isRequired
  })
}

const SelectContainerComponent = props => {
  return (
    <components.SelectContainer
      {...props}
      className={classNames(props.className, 'react-select__custom__container')}
    />
  )
}

class ContactGroupManager extends Component {
  state = {
    menuIsOpen: false
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
      deleteGroup,
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
          menuRef={this.menuRef}
          components={{
            Option: CustomOption,
            Control: MainButtonControl,
            Menu: MenuWithFixedComponent,
            MenuList: CustomMenuList,
            SelectContainer: SelectContainerComponent
          }}
          createGroup={createGroup}
          deleteGroup={deleteGroup}
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
