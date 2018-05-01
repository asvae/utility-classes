export default class MathHelpers {
  /**
   * Like Math.floor but directed towards zero, and not negative infinity.
   */
  static truncate (number: number) {
    return number < 0 ? Math.ceil(number) : Math.floor(number)
  }
}