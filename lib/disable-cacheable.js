module.exports = function DisableCacheable (source) {
  this.cacheable(false)
  return source
}
