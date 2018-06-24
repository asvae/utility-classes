import ObjectHelpers from './ObjectHelpers'
import RandomValueGenerator from './RandomValueGenerator'

export default class ArrayHelpers {
  /**
   * Toggle item in array. Check by identity.
   */
  static toggle<T> (array: T[], item: any): T[] {
    const itemIndex = array.indexOf(item)

    if (itemIndex === -1) {
      array.push(item)
      return array
    }

    array.splice(itemIndex, 1)

    return array
  }

  /**
   * Remove item from array via identity check.
   */
  static remove<T> (array: T[], item: any): T[] {
    const result = [...array]
    const foundItemIndex = array.indexOf(item)
    if (foundItemIndex !== -1) {
      result.splice(foundItemIndex, 1)
    }

    return result
  }

  /**
   * Remove item from array via identity check.
   */
  static removeByIndex<T> (array: T[], index: number): T[] {
    const result = [...array]
    result.splice(index, 1)
    return result
  }

  /**
   * Remove item from array via identity check.
   */
  static removeMany<T> (array: T[], arrayToRemove: T[]): T[] {
    return arrayToRemove.reduce((accumulator, item) => {
      return ArrayHelpers.remove(accumulator, item)
    }, array)
  }

  static fillToLength<T> (array: T[], length: number, fillWith: () => T): T[] {
    const difference = length - array.length
    if (difference > 0) {
      return [...array, ...RandomValueGenerator.getArrayByClosure(fillWith, difference)]
    }
    if (difference < 0) {
      const result = [...array]
      result.length = length
      return result
    }
    // Difference === 0
    return [...array]
  }

  /**
   * Find item by criteria.
   * Remove item if criteria was met for any.
   * Push provided item if criteria wasn't met.
   */
  static toggleByCriteria<T> (array: T[], criteria: Object | Function, item: T): T[] {
    const existingItem = array.find(
      item => {
        return typeof criteria === 'function'
          ? criteria(item)
          : ObjectHelpers.meetsCriteria(item, criteria)
      },
    )
    return existingItem ? ArrayHelpers.remove(array, existingItem)
      : [...array, item]
  }

  /**
   * Remove existing item by criteria and add new one.
   */
  static overrideByCriteria<T> (array: T[], criteria: T | Function, item: T): T[] {
    const existingItem = array.find(item => {
      return typeof criteria === 'function'
        ? criteria(item)
        : ObjectHelpers.meetsCriteria(item, criteria)
    })
    if (existingItem) {
      array = ArrayHelpers.remove(array, existingItem)
    }
    array.push(item)
    return array
  }


  static removeByCondition<T> (array: T[], condition: T | Function): T[] {
    const existingItem = array.find(
      item => {
        return typeof condition === 'function'
          ? condition(item)
          : ObjectHelpers.meetsCriteria(item, condition)
      },
    )
    if (!existingItem) {
      return array
    }

    return ArrayHelpers.remove(array, existingItem)
  }

  static removeAllByCondition<T> (array: T[], condition: any | Function): T[] {
    let arrayLengthPrevious = array.length
    while (true) {
      array = ArrayHelpers.removeByCondition(array, condition)
      if (array.length === arrayLengthPrevious) {
        return array
      }
      arrayLengthPrevious = array.length
    }
  }

  /**
   * Find index by criteria.
   */
  static findIndexByCriteria<T> (array: T[], criteria: Object | Function): number | undefined {
    const foundItem = array.find(
      item => {
        return typeof criteria === 'function'
          ? criteria(item)
          : ObjectHelpers.meetsCriteria(item, criteria)
      },
    )
    if (!foundItem) {
      return undefined
    }

    return array.indexOf(foundItem)
  }

  static replaceOnceByCondition<T> (array: T[], condition: any, replacement: T) {
    const result = [...array]

    const index = ArrayHelpers.findIndexByCriteria(array, condition)

    if (index) {
      result[index] = replacement
    }

    return result
  }

  /**
   * Sort array by object property.
   */
  static sortByProperty (array: any[], parameter: string): any[] {
    const result = [...array]
    result.sort(function (a, b) {
      return a[parameter] > b[parameter] ? 1 : -1
    })
    return result
  }

  /**
   * Check if array elements are equal.
   * Method ignores ordering.
   * Works only on strings and numbers. Not objects.
   */
  static equals<T> (one: T[], two: T[]): boolean {
    if (one === two) {
      return true
    }
    if (one.length !== two.length) {
      return false
    }
    one = [...one].sort()
    two = [...two].sort()
    return !one.some((item, index) => {
      return item !== two[index]
    })
  }


  static getUnique<T> (array: T[]): T[] {
    return array.filter((value, index, self) => array.indexOf(value) === index)
  }

  /**
   * Group array into a set of arrays based on condition.
   * Condition should return a string.
   */
  static groupByCondition<T> (array: T[], condition: (t: T) => string): { [key: string]: T[] } {
    const groups: { [key: string]: T[] } = {}
    array.forEach(item => {
      const result = condition(item)
      if (!groups[result]) {
        groups[result] = []
      }
      groups[result].push(item)
    })
    return groups
  }

  /**
   * Move array element from position to position
   */
  static sortMove<T> (array: T[], from: number, to: number): T[] {
    const el = array[from]
    array.splice(from, 1)
    array.splice(to, 0, el)
    return array
  }

  /**
   * Check if array objects are equals by id
   * TODO: test
   * TODO: thing about naming
   */
  static arraysEqualById (one: any[], two: any[]): boolean {
    if (one === two) {
      return true
    }
    if (one.length !== two.length) {
      return false
    }
    return !one.some((item, index) => {
      return !(two[index] && two[index].id === item.id)
    })
  }

  static pushToPosition<T> (array: T[], position: number, item: T): T[] {
    const clone = [...array]
    clone.splice(position, 0, item)
    return clone
  }
}
