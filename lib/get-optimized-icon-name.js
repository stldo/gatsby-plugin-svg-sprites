const incstr = require('incstr')

const iconNames = new Map()
const nextId = incstr.idGenerator({
  alphabet: 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789'
})

module.exports = path => {
  let iconName = iconNames.get(path)

  if (!iconName) {
    iconName = nextId()
    iconNames.set(path, iconName)
  }

  return iconName
}
