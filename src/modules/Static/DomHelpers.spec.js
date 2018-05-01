import DomHelpers from './DomHelpers'

describe('DomHelpers', () => {
  it('finds if element is child', () => {
    const parent = document.createElement('p')
    const child = document.createElement('p')
    parent.appendChild(child)
    expect(DomHelpers.isChild(parent, child)).toBe(true)

    const notChild = document.createElement('p')
    expect(DomHelpers.isChild(parent, notChild)).toBe(false)
  })
})
