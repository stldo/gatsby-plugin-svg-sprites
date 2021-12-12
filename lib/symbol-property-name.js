const SYMBOL_PROPERTY_REGEXP = /([^\n]+)symbol:([^\n]+)/

module.exports = function (source) {
  const { symbolPropertyName } = this.getOptions()

  return source.replace(
    SYMBOL_PROPERTY_REGEXP,
    `$1${symbolPropertyName}:$2`
  )
}
