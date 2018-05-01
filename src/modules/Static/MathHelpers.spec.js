import MathHelpers from './MathHelpers'

describe('MathHelpers', () => {
  it('truncates floats', () => {
    expect(MathHelpers.truncate(2.5)).toBe(2)
    expect(MathHelpers.truncate(-2.5)).toBe(-2)
  })
})
