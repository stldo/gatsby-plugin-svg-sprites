module.exports = class fixGatsbyTypescriptPlugin {
  apply (compiler) {
    for (const rule of compiler.options.module.rules) {
      if (String(rule.test) === '/\\.tsx?$/' && !Array.isArray(rule.use)) {
        rule.use = [rule.use]
      }
    }
  }
}
