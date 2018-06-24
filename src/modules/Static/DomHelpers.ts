export default class DomHelpers {
  /**
   * Check if parent element nests child element.
   *
   * @param parent possible parent
   * @param child possible child
   * @returns {boolean}
   */
  static isChild (parent: Node, child: Node): boolean {
    let node = child.parentNode
    while (node) {
      if (node === parent) {
        return true
      }
      node = node.parentNode
    }
    return false
  }

  /**
   * Check if current element is detached from document dom tree.
   *
   * @param element
   * @returns {boolean}
   */
  static isDetached (element: Node): boolean {
    let tempElement: Node | null = element
    while (tempElement) {
      if (tempElement === document) {
        return false
      }
      tempElement = element.parentNode
    }
    return true
  }


  /**
   * Detach node from current position and attach to new container
   */
  static reattach (node: HTMLElement, container: HTMLElement) {
    const parent = node.parentNode
    // No parent node? Abort!
    if (!parent || parent === container) {
      return
    }
    // Detach node from DOM.
    container.appendChild(node)
  }

  //TODO: make tests
  static computedStyle (el: any, prop: string, getComputedStyle?: any, style?: any) {
    getComputedStyle = window.getComputedStyle
    style =
      // If we have getComputedStyle
      getComputedStyle ?
        // Query it
        // TODO: From CSS-Query notes, we might need (node, null) for FF
        getComputedStyle(el) :

        // Otherwise, we are in IE and use currentStyle
        el.currentStyle
    if (style) {
      return style
        [
        // Switch to camelCase for CSSOM
        // DEV: Grabbed from jQuery
        // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
        // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
        prop.replace(/-(\w)/gi, function (word, letter) {
          return letter.toUpperCase()
        })
        ]
    }
  }

  //TODO: make tests
  static getLineHeight (element: any) {
    let lineHeight = DomHelpers.computedStyle(element, 'line-height')
    if (lineHeight == 'normal') {
      // Normal line heights vary from browser to browser. The spec recommends
      // a value between 1.0 and 1.2 of the font size. Using 1.2 to be safe.
      lineHeight = parseInt(DomHelpers.computedStyle(element, 'font-size')) * 1.2
    }
    return parseInt(lineHeight)
  }

  //TODO: make tests
  static getParentsForElement (element: HTMLElement): HTMLElement[] {
    const parents: HTMLElement[] = []
    let parent = this.getParentForElement(element)
    while (parent) {
      parents.push(parent)
      parent = this.getParentForElement(element)
    }
    return parents
  }

  /**
   * Find parent element. Return null when parent is window or there is no parent.
   */
  static getParentForElement (element: HTMLElement): HTMLElement | null {
    const parent = element.parentElement
    if (parent instanceof Window) {
      return null
    }
    if (!parent) {
      return null
    }
    return parent
  }

  static getWidth (el: HTMLElement): number {
    const result = DomHelpers.computedStyle(el, 'width')
    return parseInt(result)
  }
}
