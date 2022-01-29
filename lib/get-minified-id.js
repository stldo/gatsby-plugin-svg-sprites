const incstr = require('incstr')

const idents = new Map()
const nextId = incstr.idGenerator({
  alphabet: 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789'
})

module.exports = function getMinifiedId (path) {
  const ident = idents.get(path)

  if (ident) {
    return ident
  }

  const newIdent = nextId()
  idents.set(path, newIdent)

  return newIdent
}
