const isDeprecatedLifecycleWarning = (args, componentName) => {
  const [message, component] = args
  return (
    message.includes('has been renamed, and is not recommended for use') &&
    component.includes(componentName)
  )
}

export const ignoreOnConditions = (originalWarn, ignoreConditions) => {
  return function(...args) {
    if (ignoreConditions.some(condition => condition(...args))) {
      return
    }
    originalWarn.apply(this, args)
  }
}

export const makeDeprecatedLifecycleMatcher = componentName => (...args) =>
  isDeprecatedLifecycleWarning(args, componentName)

export const callAndThrow = (fn, errorMessage) => {
  return function() {
    fn.apply(this, arguments)
    throw new Error(errorMessage)
  }
}
