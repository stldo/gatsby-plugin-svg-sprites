const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin')

exports.onCreateWebpackConfig = (
  { actions, getConfig, rules },
  { pluginOptions = {}, plugins, ...options } /* Ignore 'plugins' parameter */
) => {
  const config = getConfig()
  const imagesTest = String(rules.images().test)

  for (let rule of config.module.rules) {
    if (String(rule.test) === imagesTest) {
      rule.test = new RegExp(imagesTest.replace('svg|', '').slice(1, -1))
    }
  }

  if (!options.hasOwnProperty('extract')) {
    options.extract = true
  }

  options = {
    spriteFilename: 'sprites.[contenthash].svg',
    symbolId: '[name]--[hash:base64:5]',
    ...options
  }

  config.module.rules.push({
    test: /\.svg$/,
    loader: require.resolve('svg-sprite-loader'),
    options
  })

  config.plugins.push(new SvgSpriteLoaderPlugin(pluginOptions))

  actions.replaceWebpackConfig(config)
}
