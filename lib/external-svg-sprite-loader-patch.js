const MODULE_EXPORTS_REGEXP = /([^\n]+)symbol:([^\n]+)/

module.exports = input => input.replace(
  MODULE_EXPORTS_REGEXP,
  '$1url:$2\n$1symbol:$2'
)
