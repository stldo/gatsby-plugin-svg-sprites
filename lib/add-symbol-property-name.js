const SYMBOL_PROPERTY_REGEXP = /([^\n]+)symbol:([^\n]+)/

module.exports = function (source) {
  const { addSymbolPropertyName } = this.getOptions()

  return addSymbolPropertyName
    ? source.replace(
      SYMBOL_PROPERTY_REGEXP,
      `$1${addSymbolPropertyName}:$2\n$1symbol:$2`
    )
    : source
}
