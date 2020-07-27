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
  }
}

// Ignore warnings that we think are not problematic, see
// https://github.com/cozy/cozy-ui/issues/1318
// eslint-disable-next-line no-console
// console.warn = ignoreOnConditions(
//   // eslint-disable-next-line no-console
//   callAndThrow(console.warn, 'console.warn should not be called during tests'),
//   // console.warn,
//   Object.values(ignoredWarnings).map(x => x.matcher)
// )

//
//
//
//

const ignoredWarnings2 = {
  ReactFinalForm: {
    warningToIgnore: 'has been renamed, and is not recommended for use',
    reason: 'External component on which we have no control'
  },
  Provider: {
    warningToIgnore: 'has been renamed, and is not recommended for use',
    reason: 'External component on which we have no control'
  }
}

function toto(originalWarn, ignoredWarnings2) {
  // return function() {
  //   originalWarn.apply(this, arguments)
  // }

  return function(...args) {
    let [msg, component] = args
    const warning =
      ignoredWarnings2[component] === undefined
        ? null
        : component === undefined
          ? null
          : ignoredWarnings2[component].warning

    if (msg.includes(warning)) {
      originalWarn.apply(this, [
        `${component} : ${ignoredWarnings2[component].reason}`
      ])
    }
  }
}

const tutu = ignoredWarnings => {
  const origWarn = console.warn

  console.warn = function(...args) {
    const [msg, component] = args
    console.info('>> MESSAGE : ', msg)
    console.info('>> COMPONENT : ', component)
    const warning =
      ignoredWarnings[component] === undefined
        ? null
        : component === undefined
          ? null
          : ignoredWarnings[component].warning
    if (msg.includes(warning))
      return console.warn(`${component} : ${ignoredWarnings[component].reason}`)

    return function() {
      console.error('yala')
      origWarn.apply(this, arguments)
      // throw new Error('console.warn should not be called during tests')
    }
  }
}

// tutu(ignoredWarnings2)

// console.warn = toto(origWarn, ignoredWarnings2) // eslint-disable-line no-console

const origWarn = console.warn // eslint-disable-line no-console
console.warn = function(...args) {
  const [msg, component] = args
  // console.info('>> ARGS : ', args)
  console.info('>> MESSAGE : ', msg)
  console.info('>> COMPONENT : ', component)
  if (
    component.includes('ReactFinalForm') ||
    component.includes('Provider') ||
    component.includes('Select')
  ) {
    console.info('>> if')
    return
  }
  console.info('>> else')
  // return console.warn('SOME') // eslint-disable-line no-console
  return origWarn.apply(this, arguments)
}

//
// OLD

//
//
//
// compliqué :
// yarn test ContactsList/ContactRow.spec.js --watch
// yarn test allContacts.spec.js --watch
// yarn test ContactForm/index.spec.jsx --watch
// simple :
// yarn test Form/HasValueCondition.spec.jsx --watch
// yarn test ContactCard/ContactIdentity.spec.jsx --watch
// yarn test ContactGroups/ContactGroupManager.spec.jsx --watch
// yarn test ContactCard/ContactAccounts.spec.jsx --watch
// yarn test ContactGroups/ContactGroupList.spec.jsx --watch
//
