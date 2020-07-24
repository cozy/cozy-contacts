import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
  makeDeprecatedLifecycleMatcher,
  ignoreOnConditions,
  callAndThrow
} from './jestUtils'

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
console.warn = ignoreOnConditions(
  // eslint-disable-next-line no-console
  callAndThrow(console.warn, 'console.warn should not be called during tests'),
  Object.values(ignoredWarnings).map(x => x.matcher)
)
