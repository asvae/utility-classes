let count = 1

export default class RandomValueGenerator {
  /**
   * Get random id
   */
  static getUniqueId (): number {
    return ++count
  }

  /**
   * Get random number in specified range.
   */
  static getNumber (min: number = 5, max: number = 50): number {
    max = max + 1
    return Math.floor(Math.random() * (max - min)) + min
  }

  /**
   * Get random string in specified range.
   */
  static getString (size: number = 5, possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let text = ''
    RandomValueGenerator.getArrayByClosure(() => {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }, size)
    return text
  }


  /**
   * Get random date in past.
   */
  static takeFromArray<T> (array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }


  /**
   * Get unique id. @see https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  static getUIID (): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  /**
   * Get random date in past.
   */
  // static getDateFromPast (): Day {
  //   return new Day(RandomValueGenerator.getNumber(0, +new Date()))
  // }

  /**
   * Get random date in future.
   */
  // static getDateFromFuture (): Day {
  //   return new Day(RandomValueGenerator.getNumber(+new Date(), (+new Date()) * 2))
  // }

  /**
   * Get random time.
   */
  // static getRandomTime (): Time {
  //   return new Time(new Date(RandomValueGenerator.getNumber(0, +new Date() * 1000)))
  // }

  /**
   * Get random date and time in past.
   */
  // static getDateTimeFromPast (): DayTime {
  //   return new DayTime({
  //     day: RandomValueGenerator.getDateFromPast(),
  //     time: RandomValueGenerator.getRandomTime(),
  //   })
  // }

  /**
   * Get random date and time in future.
   */
  // static getDateTimeFromFuture (): DayTime {
  //   return new DayTime({
  //     day: RandomValueGenerator.getDateFromFuture(),
  //     time: RandomValueGenerator.getRandomTime(),
  //   })
  // }

  /**
   * Get random boolean.
   */
  static getBoolean (): boolean {
    return Math.random() >= 0.5
  }

  /**
   * Get array of undefined of length specified.
   */
  static getCleanArray (length: number = 0): undefined[] {
    return Array.apply(null, Array(length))
  }

  /**
   * Get array of random size in range.
   */
  static getArray (min: number = 0, max: number = 3): undefined[] {
    const length = RandomValueGenerator.getNumber(min, max)
    return RandomValueGenerator.getCleanArray(length)
  }

  static getArrayByClosure<T> (closure: () => T, size: number = 3): T[] {
    return RandomValueGenerator.getCleanArray(size).map(closure)
  }
}
