function _some () {

}

export default class TestClass {
  id: number
  name: string

  constructor (data: { id: number, name: string }) {
    this.id = data.id
    this.name = data.name
  }
}
