import MappingHelpers from './MappingHelpers'
import TestClass from '../Mocks/TestClass'

describe('MappingHelpers', () => {
  describe('maps', () => {
    it('simple object', () => {
      expect(MappingHelpers.mapMerge({ id: 1 })).toEqual({ id: 1 })
    })
    it('several objects', () => {
      expect(MappingHelpers.mapMerge(undefined, { id: 5 })).toEqual({ id: 5 })
      expect(MappingHelpers.mapMerge(undefined, { from: 5, to: 6 }))
        .toEqual({ from: 5, to: 6 })
    })
    it('handles undefined fields in auxiliary object', () => {
      expect(MappingHelpers.mapMerge(undefined, {
        from: undefined,
        to: undefined
      })).toBeNull()
    })
    it('casts when class is provided', () => {
      expect(MappingHelpers.mapMerge(undefined, {
        from: undefined,
        to: undefined
      })).toBeNull()
    })
  })

  it('maps with type', () => {
    class TestClass {
      constructor (item) {
        this.item = item
      }
    }

    const object = MappingHelpers.mapWithType(undefined, { from: 1 }, TestClass)
    expect(object instanceof TestClass).toBe(true)
    expect(object.item.from).toBe(1)
  })

  it('maps with closure', () => {
    const closure = item => item.value
    expect(MappingHelpers.mapWithClosure({ value: 1 }, { value: undefined }, closure))
      .toBe(1)
    expect(MappingHelpers.mapWithClosure({ value: 1 }, { value: 2 }, closure))
      .toBe(1)
    expect(MappingHelpers.mapWithClosure(null, { value: 2 }, closure))
      .toBe(2)
  })

  describe('fixes ids in', () => {
    it('simple object', () => {
      const unfixed = { one_id: 50 }
      const fixed = { one: { id: 50 }}
      MappingHelpers.fixIds(unfixed)
      expect(unfixed).toEqual(fixed)
    })
    it('nested object', () => {
      const unfixed = { one: { two_id: 50 }}
      const fixed = { one: { two: { id: 50 }}}
      MappingHelpers.fixIds(unfixed)
      expect(unfixed).toEqual(fixed)
    })
    it('array', () => {
      const unfixed = [{ one_id: 50 }, { two_id: 51 }]
      const fixed = [{ one: { id: 50 }}, { two: { id: 51 }}]
      MappingHelpers.fixIds(unfixed)
      expect(unfixed).toEqual(fixed)
    })
  })
  describe('unfixes ids in', () => {
    it('simple object', () => {
      const fixed = { one: { id: 50 }}
      const unfixed = { one_id: 50, one: { id: 50 }}
      MappingHelpers.unfixIds(fixed)
      expect(unfixed).toEqual(fixed)
    })
    it('nested object', () => {
      const fixed = { one: { two: { id: 50 }}}
      const unfixed = { one: { two_id: 50, two: { id: 50 }}}
      MappingHelpers.unfixIds(fixed)
      expect(unfixed).toEqual(fixed)
    })
    it('array', () => {
      const fixed = [{ one: { id: 50 }}, { two: { id: 51 }}]
      const unfixed = [
        { one_id: 50, one: { id: 50 }},
        { two_id: 51, two: { id: 51 }}
      ]
      MappingHelpers.unfixIds(fixed)
      expect(unfixed).toEqual(fixed)
    })
  })
  it('checks if object is id object', () => {
    const idObject = { id: 5 }
    const notIdObject = { id: 5, name: 'name' }
    expect(MappingHelpers.isIdObject(idObject)).toBe(true)
    expect(MappingHelpers.isIdObject(notIdObject)).toBe(false)
  })

  it('hydrateTree', () => {
    const fromTree = {
      items: [
        new TestClass({ id: 5, name: '5' }),
      ]
    }

    const toTree = {
      items: [
        new TestClass({ id: 5 }),
      ]
    }

    MappingHelpers.hydrateTree(fromTree, toTree, TestClass)

    expect(toTree.items[0]).toBe(fromTree.items[0])
  })
})
