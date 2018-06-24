import StringHelpers from './StringHelpers'

describe('StringHelpers', () => {
  it('truncate', () => {
    const text = 'Long text'
    expect(StringHelpers.truncate(text, 4)).toBe('Long...')
    expect(StringHelpers.truncate(text, 9)).toBe('Long text')
  })
  it('toKebabCase', () => {
    const text = 'someCamelCaseLongText whit space and_snake_case'
    expect(StringHelpers.toKebabCase(text))
      .toBe('some-camel-case-long-text-whit-space-and-snake-case')
  })
  it('toCamelCase', () => {
    const text = 'someCamelCaseLongText whit space and_snake_case'
    expect(StringHelpers.toCamelCase(text))
      .toBe('someCamelCaseLongTextWhitSpaceAndSnakeCase')
  })
  it('toPascalCase', () => {
    const text = 'someCamelCaseLongText whit space and_snake_case kebab-case'
    expect(StringHelpers.toPascalCase(text))
      .toBe('SomeCamelCaseLongTextWhitSpaceAndSnakeCaseKebabCase')
  })
})
