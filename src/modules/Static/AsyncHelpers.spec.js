import AsyncHelpers from './AsyncHelpers'

describe('AsyncHelpers', () => {
  it('sleep', (done) => {
    AsyncHelpers.sleep(0.1).then(done)
  })
  it('waitConditional', (done) => {
    const commonObject = { value: false }

    setTimeout(() => {
      commonObject.value = true
    }, 200)

    AsyncHelpers.waitConditional(() => commonObject.value)
      .then(() => {
        expect(commonObject.value).toBe(true)
        done()
      })
  })
})