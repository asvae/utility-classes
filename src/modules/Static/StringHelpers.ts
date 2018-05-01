
export default class StringHelpers {
  static truncate (text: string, maxChars: number): string {
    if (!text) {
      return ''
    }
    return text.length <= maxChars ? text : text.substring(0, maxChars) + '...'
  }

  static toKebabCase(text: string){
    return text.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/(\s+|_)/g, '-')
      .toLowerCase();
  }

  static toCamelCase(text: string){
    return text
      .replace(/(\s|_)(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/\s|_/g, '')
      .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }

  static toPascalCase(text: string){
    return text
      .replace(/(\s|_|-)(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/\s|_|-/g, '')
      .replace(/^(.)/, function($1) { return $1.toUpperCase(); });
  }
}
