export default class AsyncHelpers {
  /**
   * Basically setTimeout that returns promise.
   *
   * @param {Number | undefined} time
   * @returns {Promise}
   */
  static sleep (time: Number = 0): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }

  static waitConditional (condition, iterationTimeout = 20, maxTimeout = 2000, timeout = 2000) {
    if (!timeout) {
      throw new Error('Time expired but condition is not met')
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        condition()
          ? resolve()
          : AsyncHelpers.waitConditional(condition, iterationTimeout, maxTimeout, timeout - iterationTimeout)
            .then(resolve)
      }, iterationTimeout)
    })
  }
}
