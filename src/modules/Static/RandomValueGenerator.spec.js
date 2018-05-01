import UniqueValueGenerator from './RandomValueGenerator'

describe('RandomValueGenerator', () => {
  it('generates unique id', () => {
    const id = UniqueValueGenerator.getUniqueId()
    const another_id = UniqueValueGenerator.getUniqueId()
    expect(id).not.toBe(another_id)
  })
  it('generates unique number', () => {
    const number = UniqueValueGenerator.getNumber(60, 61)
    expect(number >= 60 && number <= 61).toBe(true)
  })
  it('generates array', () => {
    const oneOrZero = UniqueValueGenerator.getArray(0, 1)
    expect(oneOrZero.length <= 1).toBe(true)
    const filled = UniqueValueGenerator.getArray(3, 5)
    expect(filled.length >= 3 && filled.length <= 5).toBe(true)
  })
  it('generates array by closure', () => {
    let count = 0
    UniqueValueGenerator.getArrayByClosure(() => count++, 6)
    expect(count).toBe(6)
  })
})
