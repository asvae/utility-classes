import ObjectHelpers from './ObjectHelpers'

describe('object helpers', () => {
  it('checks if meets criteria', () => {
    expect(ObjectHelpers.meetsCriteria({ s: 1 }, { s: 2 })).toBe(false)
    expect(ObjectHelpers.meetsCriteria({ s: 1 }, { s: 1 })).toBe(true)
  })

  it('finds nested items', () => {
    const routes = [ // 0
      { // 1
        name: 'some',
        children: [ // 2
          { name: 'some-1' },
          { name: 'some-2' }, // 3
        ],
      },
    ]

    const result = ObjectHelpers.traverseBranch(
      routes,
      { name: 'some-2' },
    )
    expect(result.length).toBe(4)
    expect(result[0]).toBe(routes)
    expect(result[1].name).toBe('some')
    expect(Array.isArray(result[2])).toBe(true)
    expect(result[3].name).toBe('some-2')
  })

  describe('traverseBranches', () => {
    it('handles recursive loops', () => {
      const parent = { id: 5 }
      parent.child = { id: 20, parent }

      let count = 0
      ObjectHelpers.traverseBranches(parent, item => {
        count++
      })
      expect(count).toBe(2)
    })
  })

  it('traverses tree', () => {
    function expectNodes (tree, nodes) {
      let count = 0
      ObjectHelpers.traverse(tree, item => {
        count++
      })
      expect(count).toBe(nodes)
    }

    expectNodes({ one: { id: 5 } }, 2)
    expectNodes({ one: { id: 5 }, two: { id: 6 } }, 3)
    expectNodes([{ id: 1 }, { id: 2 }, { id: 3 }], 4)
    expectNodes([{ id: 1 }, { id: 2 }, [{ id: 3 }]], 5)
  })

  it('hasDescendants', () => {
    expect(ObjectHelpers.hasDescendants({})).toBe(false)
    expect(ObjectHelpers.hasDescendants({ id: 1, name: 'name' })).toBe(false)
    expect(ObjectHelpers.hasDescendants({ id: 1, name: {} })).toBe(true)
    expect(ObjectHelpers.hasDescendants({ id: 1, name: [] })).toBe(true)

    expect(ObjectHelpers.hasDescendants([1, 2, 3])).toBe(false)
    expect(ObjectHelpers.hasDescendants([1, 2, {}])).toBe(true)
  })

  it('flattenTree', () => {
    const before = {
      id: 5,
      product: { id: 10 },
      booking: { fields: [{ id: 5 }, { id: 6 }] },
    }
    const after = [
      before,
      { id: 10 },
      { fields: [{ id: 5 }, { id: 6 }] },
      [{ id: 5 }, { id: 6 }],
      { id: 5 },
      { id: 6 },
    ]
    expect(ObjectHelpers.flattenTree(before)).toEqual(after)
  })

  it('invert', () => {
    const before = {
      1: 'one',
      2: 'two',
      3: 'three',
    }
    const after = {
      one: '1',
      two: '2',
      three: '3',
    }
    expect(ObjectHelpers.invert(before)).toEqual(after)
  })
})
