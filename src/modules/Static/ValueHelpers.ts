// TODO: test

export default class ValueHelpers {
  static isEmpty (value) {
    if (Array.isArray(value))
      return ValueHelpers.isEmptyArray(value)
    if (value instanceof Object)
      return ValueHelpers.isEmptyObject(value)

    return !value
  }

  static isEmptyArray (value) {
    return !(Array.isArray(value) && value.length)
  }

  static isEmptyObject (value) {
    return !(value instanceof Object && Object.keys(value).length)
  }
}