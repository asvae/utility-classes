import ValueHelpers from './ValueHelpers'

export default class ObjectHelpers {
  /**
   * Find nested branch with object that meets criteria.
   * Branch is returned in form of array, where index means depth.
   *
   * Example:
   *
   * const parent =
   * [
   *   {
   *     one: {name: 1},
   *     two: {name: 2},
   *   },
   *   {
   *     one: {name: 3},
   *     two: {name: 4},
   *   },
   * ]
   *
   * ObjectHelpers.traverseBranch(parent, {name: 4})
   * [
   *   parent,
   *   {one: {name: 3}, two: {name: 4}},
   *   {name: 4},
   * ]
   *
   * @param parent object|array
   * @param criteria object
   * @returns {*}
   */
  static traverseBranch (parent: any, criteria: any): any[] {
    const result = ObjectHelpers.findNestedRecursive(parent, criteria)
    return result ? [parent, ...result] : []
  }

  /**
   * @protected
   * @param parent
   * @param criteria
   * @returns {*}
   */
  static findNestedRecursive (parent: any, criteria: any): any {
    if (!(Array.isArray(parent) || typeof parent === 'object')) {
      return null
    }

    for (const index in parent) {
      const item = parent[index]

      if (item && typeof item === 'object' && ObjectHelpers.meetsCriteria(item, criteria)) {
        return [item]
      }
      const result = ObjectHelpers.findNestedRecursive(item, criteria)
      if (result) {
        return [item, ...result]
      }
    }
    return null
  }

  /**
   * Traverse branches of object|array tree (and not trunk itself)
   * Truthy value from closure stops traversing.
   * Won't traverse recursive nodes.
   */
  static traverseBranches (
    parent: any,
    closure: (child: any, parent: any, index: string | number) => any, pool: any[] = [],
  ): void {
    if (pool.includes(parent)) {
      return
    }
    pool.push(parent)
    for (const index in parent) {
      const child = parent[index]
      if (typeof child === 'object') {
        if (closure(child, parent, index)) {
          return
        }
        ObjectHelpers.traverseBranches(child, closure, pool)
      }
    }
  }

  /**
   * Traverse tree of object|array.
   */
  static traverse (node: any, closure: (child: any, parent?: any, index?: string | number) => any) {
    closure(node)
    ObjectHelpers.traverseBranches(node, closure)
  }

  /**
   * Object meets criteria.
   *
   * @protected
   * @param object
   * @param criteria
   * @returns {boolean}
   */
  static meetsCriteria (object: { [key: string]: any }, criteria: { [key: string]: any }) {
    for (const index in criteria) {
      if (criteria[index] !== object[index]) {
        return false
      }
    }
    return true
  }

  /**
   * Check if object has array|object descendants.
   */
  static hasDescendants (object: { [key: string]: any }): Boolean {
    for (const index in object) {
      const item = object[index]
      if (item && typeof item === 'object') {
        return true
      }
    }
    return false
  }

  /**
   * Flatten array|object tree.
   */
  static flattenTree (object: any): any[] {
    let result = [object]
    for (const index in object) {
      const property = object[index]

      if (property && typeof property === 'object') {
        result = [...result, ...ObjectHelpers.flattenTree(property)]
      }
    }
    return result
  }

  /**
   * Invert object key to avlues.
   */
  static invert (object: { [key: string]: string | number }): { [key: string]: string } {
    const invertedObject: { [key: string]: string } = {}
    Object.keys(object).map(key => {
      invertedObject[object[key]] = key
    })
    return invertedObject
  }

  /**
   * refresh current instance via merge with given delegate.
   * if new instance have options === undefined || null, they will be ignored
   *
   * NOTE: fast hack @d3
   */
  static fresh (source: { [key: string]: any }, data: any): void {
    const newObject: { [key: string]: any } = {}
    Object.keys(data).forEach(key => {
      if (!ValueHelpers.isEmpty(data[key])) {
        newObject[key] = data[key]
      }
    })
    Object.assign(source, newObject)
  }
}
