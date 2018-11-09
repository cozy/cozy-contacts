import React, { Component } from 'react'
import { Icon, Input, translate } from 'cozy-ui/react'
import classNames from 'classnames'

const normalizeGroupData = name => {
  return {
    name: name,
    metadata: {
      version: 1
    }
  }
}
class ContactGroupCreation extends Component {
  state = {
    isInputDisplayed: false,
    groupName: ''
  }
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }
  handleClick = () => {
    this.setState({ isInputDisplayed: !this.state.isInputDisplayed })
  }
  onFocus = e => {
    e.stopPropagation()
  }

  onClick = e => {
    e.stopPropagation()
  }
  keyPress = async e => {
    if (e.keyCode == 13) {
      this.props.createGroup(normalizeGroupData(e.target.value))
      this.textInput.current.value = ''
    }
    e.stopPropagation()
  }

  onMouseDown = e => {
    e.stopPropagation()
  }

  render() {
    const { isInputDisplayed } = this.state
    const { t } = this.props
    return (
      <div>
        <div className={classNames('contact-group-creation-divider')} />
        <div
          className={classNames(
            'u-ml-half',
            'u-mb-half',
            'u-mr-half',
            'u-c-pointer',
            'container'
          )}
        >
          {!isInputDisplayed && (
            <div onClick={this.handleClick}>
              <Icon icon="plus" />
              {t('groups.create')}
            </div>
          )}
          {isInputDisplayed && (
            <Input
              id={'createGroupInput'}
              inputRef={this.textInput}
              type="text"
              placeholder={t('groups.name')}
              onClick={this.onClick}
              onFocus={this.onFocus}
              onKeyDown={this.keyPress}
              size="tiny"
              autoComplete="off"
              autoFocus={true}
              onMouseDown={this.onMouseDown}
            />
          )}
        </div>
      </div>
    )
  }
}

export default translate()(ContactGroupCreation)
