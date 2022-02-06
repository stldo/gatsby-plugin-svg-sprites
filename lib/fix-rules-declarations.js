module.exports = function fixRulesDeclarations (rules) {
  for (const rule of rules) {
    if (rule.use && !Array.isArray(rule.use)) {
      rule.use = [rule.use]
    }
  }
}
