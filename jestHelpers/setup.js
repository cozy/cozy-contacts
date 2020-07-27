import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { makeDeprecatedLifecycleMatcher, ignoreOnConditions } from './jestUtils'

Enzyme.configure({ adapter: new Adapter() })

const ignoredWarnings = {
  ReactFinalForm: {
    reason: 'External component on which we have no control',
    matcher: makeDeprecatedLifecycleMatcher('ReactFinalForm')
  },
  Provider: {
    reason: 'External component on which we have no control',
    matcher: makeDeprecatedLifecycleMatcher('Provider')
  },
  Select: {
    reason: 'External component on which we have no control',
    matcher: makeDeprecatedLifecycleMatcher('Select')
  }
}

// Ignore warnings that we think are not problematic, see
// https://github.com/cozy/cozy-ui/issues/1318
// eslint-disable-next-line no-console
// console.warn = ignoreOnConditions(
//   // eslint-disable-next-line no-console
//   console.warn,
//   Object.values(ignoredWarnings).map(x => x.matcher)
// )

const toBeIgnored = {
  ReactFinalForm: {
    warningToIgnore: 'has been renamed, and is not recommended for use',
    reason: 'External component on which we have no control'
  },
  Provider: {
    warningToIgnore: 'has been renamed, and is not recommended for use',
    reason: 'External component on which we have no control'
  },
  Select: {
    warningToIgnore: 'has been renamed, and is not recommended for use',
    reason: 'External component on which we have no control'
  }
}

const ignoreWarning = ignored => {
  const originalWarn = console.warn // eslint-disable-line no-console

  return function(...args) {
    const [message, component] = args

    const warningToIgnore =
      component && ignored[component]
        ? ignored[component].warningToIgnore
        : null

    return message.includes(warningToIgnore)
      ? false
      : originalWarn.apply(this, arguments)
  }
}

console.warn = ignoreWarning(toBeIgnored) // eslint-disable-line no-console
