import ArrayHelpers from './ArrayHelpers'

describe('ArrayHelpers', () => {
  it('finds item index by criteria', () => {
    const array = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }]
    expect(ArrayHelpers.findIndexByCriteria(array, { name: 'two' })).toBe(1)
    expect(ArrayHelpers.findIndexByCriteria(array, item => item.name === 'one'))
      .toBe(0)
  })

  it('toggles element in array', () => {
    const array = [1, 2]
    ArrayHelpers.toggle(array, 3)
    expect(array.length).toBe(3)
    ArrayHelpers.toggle(array, 3)
    expect(array.length).toBe(2)
  })

  it('replaceOnceByCondition', () => {
    const array = [{ id: 1 }, { id: 2, name: 'before' }, { id: 3 }]
    const replacement = { id: 2, name: 'after' }
    const result = ArrayHelpers.replaceOnceByCondition(array, item => item.id === 2, replacement)
    expect(result[1].name).toBe('after')
  })

  it('removes element in array', () => {
    const object1 = { id: 1 }
    const object2 = { id: 2 }
    const array = [object1, object2]
    expect(ArrayHelpers.remove(array, object1).length).toBe(1)
    expect(ArrayHelpers.remove(array, { id: 1 }).length).toBe(2)
  })

  it('sorts items in array by property', () => {
    const array = [{ name: 'banana' }, { name: 'cranberry' }, { name: 'apple' }]
    const sortedArray = ArrayHelpers.sortByProperty(array, 'name')

    expect(sortedArray[0]['name']).toBe('apple')
    expect(sortedArray[1]['name']).toBe('banana')
    expect(sortedArray[2]['name']).toBe('cranberry')
  })

  it('removeAllByCondition', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 2 }]
    const result = ArrayHelpers.removeAllByCondition(array, item => item.id === 2)

    expect(result.length).toBe(1)
  })

  it('fills to length', () => {
    const array = [{ id: 1 }, { id: 2 }]
    const resultLong = ArrayHelpers.fillToLength(array, 3, () => {
      return { id: 3 }
    })
    expect(resultLong.length).toBe(3)

    const resultShort = ArrayHelpers.fillToLength(array, 1, () => {
      return { id: 3 }
    })

    expect(resultShort.length).toBe(1)
  })

  describe('toggles', () => {
    it('in', () => {
      const array = [{ id: 1 }]
      const toggledObject = { id: 2, name: 'Foo' }
      const toggledIn = ArrayHelpers.toggleByCriteria(array, { id: 2 }, toggledObject)
      expect(toggledIn.length).toBe(2)
    })
    it('out', () => {
      const array = [{ id: 1 }, { id: 2 }]
      const toggledObject = { id: 2, name: 'Foo' }
      const toggledOut = ArrayHelpers.toggleByCriteria(array, { id: 2 }, toggledObject)
      expect(toggledOut.length).toBe(1)
    })
  })

  describe('equals', () => {
    it('in', () => {
      const original = [1, 2, 3]
      const same = [3, 2, 1]
      const notSame = [3, 2, 2]
      expect(ArrayHelpers.equals(original, same)).toBe(true)
      expect(ArrayHelpers.equals(original, notSame)).toBe(false)
    })
  })

  it('groupsByCondition', () => {
    const array = [{ id: 5 }, { id: 5 }, { id: 7 }]
    const groups = ArrayHelpers.groupByCondition(array, item => item.id)
    const expected = {
      5: [{ id: 5 }, { id: 5 }],
      7: [{ id: 7 }],
    }
    expect(groups).toEqual(expected)
  })

  describe('sortMove', () => {
    it('in', () => {
      const original = [{ name: 'first' }, { name: 'second' }, { name: 'third' }]
      const modified = ArrayHelpers.sortMove(original, 1, 0)

      expect(modified[0]['name']).toBe('second')
      expect(modified[1]['name']).toBe('first')
      expect(modified[2]['name']).toBe('third')
    })
  })

  it('pushToPosition', () => {
    const original = ['one', 'two', 'four']
    const expected = ['one', 'two', 'three', 'four']
    const modified = ArrayHelpers.pushToPosition(original, 2, 'three')
    expect(modified).toEqual(expected)
  })
})
