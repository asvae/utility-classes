// TODO: test

export default class ValueHelpers {
  static isEmpty (value: any) {
    if (Array.isArray(value))
      return ValueHelpers.isEmptyArray(value)
    if (value instanceof Object)
      return ValueHelpers.isEmptyObject(value)

    return !value
  }

  static isEmptyArray (value: any) {
    return !(Array.isArray(value) && value.length)
  }

  static isEmptyObject (value: any) {
    return !(value instanceof Object && Object.keys(value).length)
  }
}