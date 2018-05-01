export default class DecimalHelpers {
  /**
   * Round decimal with set amount of symbols after comma.
   */
  static setZeros (decimal: string | number, zeros: number = 2) {
    decimal = '' + decimal
    let [beforeComma = 0, afterComma = 0] = (decimal + '').split('.')
    if (!afterComma) {
      afterComma = Array(zeros + 1).join('0')
    }
    return beforeComma + '.' + afterComma.slice(0, zeros)
  }

  /**
   * Add zeros to front of number.
   * @param item
   * @param zeros Max quantity of zeros
   */
  static addZerosToFront (number: number, zeros: number = 2): string {
    const stringifiedNumber = number + ''
    if (stringifiedNumber.length >= zeros) {
      return stringifiedNumber
    }
    return Array(zeros - stringifiedNumber.length + 1).join('0') + stringifiedNumber
  }

  /**
   * returns number of digits after comma
   * @param num
   * @return {number}
   */

  static decimalPlaces (num) {
    const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
    if (!match) {
      return 0
    }
    return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0)
      // Adjust for scientific notation.
      - (match[2] ? +match[2] : 0))
  }
}
