import DecimalHelpers from './DecimalHelpers'

describe('DecimalHelpers', () => {
  describe('selects the number of zeros after comma', () => {
    it('for string', () => {
      expect(DecimalHelpers.setZeros('15.000000')).toBe('15.00')
    })
    it('for for number', () => {
      expect(DecimalHelpers.setZeros(0)).toBe('0.00')
    })
  })
  it('add zeros to front of number', () => {
    expect(DecimalHelpers.addZerosToFront(5, 2)).toBe('05')
  })
  describe('returns the count of digits after comma', () => {
    it('for number', () => {
      expect(DecimalHelpers.decimalPlaces(15.11111)).toBe(5)
    })
    it('for string', () => {
      expect(DecimalHelpers.decimalPlaces('15.11111')).toBe(5)
    })
    it('for e', () => {
      expect(DecimalHelpers.decimalPlaces('25e-100')).toBe(100)
    })
  })
  describe('separate numbers with space', () => {
    it('for decimal', () => {
      expect(DecimalHelpers.numberWithSpaces(1111.11)).toBe('1 111.11')
    })
    it('for integer', () => {
      expect(DecimalHelpers.numberWithSpaces(1500)).toBe('1 500')
    })
    it('for string', () => {
      expect(DecimalHelpers.numberWithSpaces('1500')).toBe('1 500')
    })
  })
  describe('transform string number with spaces to number', () => {
    it('for decimal', () => {
      expect(DecimalHelpers.fixNumberWithSpaces('1 111.11')).toBe(1111.11)
    })
    it('for integer', () => {
      expect(DecimalHelpers.fixNumberWithSpaces('1 500')).toBe(1500)
    })

  })
})
