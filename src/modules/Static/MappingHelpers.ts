import ObjectHelpers from './ObjectHelpers'

export type ObjectOrArray = {[key: string]: any} | any[]

export default class MappingHelpers {
  /**
   * A bit weird function.
   * Gonna explain the case.
   * I have main object and auxiliary object.
   * Main object might look like this: {id: 5}, or be null.
   * Auxiliary object might look like this {id: 5} or like this {id: undefined}
   * And what we try to do is get the best looking object out of this arrangement.
   * We start from main, then go to auxiliary. If auxiliary object has empty spots
   * we default to null.
   * This is useful when object arrives at some point as {data_one: 1, data_two: 2}
   * and at other point as {data: {one: 1, two: 2}}. And we need to accommodate both
   * cases into one.
   */
  static mapMerge (main: Object, auxiliary: Object = {}): Object | null {
    if (main) {
      return main
    }
    // If has filled fields.
    if (Object.keys(auxiliary).some(index => auxiliary[index])) {
      return auxiliary
    }

    return null
  }

  /**
   * @see mapMerge
   * Also applies type if value is not empty.
   */
  static mapWithType (main: Object, auxiliary: Object = {}, Type: any): Object | null {
    const result = MappingHelpers.mapMerge(main, auxiliary)
    return result ? new Type(result) : null
  }

  /**
   * @see mapMerge
   * Runs closure if value is not empty.
   */
  static mapWithClosure (main: Object, auxiliary: Object = {}, closure: Function): Object | null {
    const result = MappingHelpers.mapMerge(main, auxiliary)
    return result ? closure(result) : null
  }

  /**
   * Fix parameters with incorrect ids.
   * Works only for number ids. Also won't override existing values.
   * Example:
   * Before: {user_id: 5}
   * After: {user: {id: 5}}
   */
  static fixIds (data: any[] | Object): void {
    ObjectHelpers.traverse(data, node => {
      for (const key in node) {
        const property = node[key]
        if (property && typeof property === 'object') {
          continue
        }
        const matches = /(.+)_id$/g.exec(key)
        if (matches && (typeof property === 'number')) {
          const entityName = matches[1]
          if (!node[entityName]) {
            node[entityName] = { id: property }
          }
          delete node[key]
        }
      }
    })
  }

  static isIdObject (object: Object) {
    const keys = Object.keys(object)
    return keys.length === 1 &&
      keys[0] === 'id' &&
      (typeof object['id'] === 'number')
  }

  /**
   * Exact opposite of fixIds.
   * Example:
   * Before: {user: {id: 5}}
   * After: {user: {id: 5}, user_id: 5}
   */
  static unfixIds (data: any[] | Object): void {
    ObjectHelpers.traverse(data, node => {
      for (const key in node) {
        const property = node[key]
        if ((!property) || (typeof property !== 'object') || (typeof property.id !== 'number')) {
          continue
        }
        node[(key + '_id')] = property.id
      }
    })
  }

  /**
   * Fill objects from one tree to another.
   */
  static hydrateTree (from: any, to: any, type: Function): void {
    ObjectHelpers.traverseBranches(to, (toItem: any, parent: any, index: string) => {
      // Check if item is getter. Ignore it if so.
      if (parent) {
        const descriptor = Object.getOwnPropertyDescriptor(parent, index)
        if (!descriptor) {
          return
        }
      }
      if (!(toItem instanceof type)) {
        return // continue
      }
      ObjectHelpers.traverseBranches(from, (fromItem: any) => {
        if (!(fromItem instanceof type) || toItem.id !== fromItem.id) {
          return
        }
        parent[index] = fromItem
        return true // break
      })
    })
  }
}
