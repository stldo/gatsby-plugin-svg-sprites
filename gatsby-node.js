const SvgStorePlugin = require('external-svg-sprite-loader')
const { resolve } = require('path')

const GatsbyTypescriptPluginFix = require('./lib/gatsby-typescript-plugin-fix')
const getOptimizedIconName = require('./lib/get-optimized-icon-name')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

exports.onCreateWebpackConfig = ({ actions, getConfig, rules }, {
  optimize = IS_PRODUCTION,
  pluginOptions = {},
  plugins: _,
  symbolPropertyName,
  ...externalSvgSpriteLoaderOptions
}) => {
  const config = getConfig()
  const imagesRule = rules.images()
  const imagesRuleTest = String(imagesRule.test)

  const rule = {
    test: /\.svg$/,
    use: [{
      loader: SvgStorePlugin.loader,
      options: {
        name: 'sprites.[contenthash].svg',
        iconName: optimize ? getOptimizedIconName : '[name]--[hash:base64:5]',
        ...externalSvgSpriteLoaderOptions
      }
    }]
  }

  if (symbolPropertyName) {
    rule.use.unshift({
      loader: resolve(__dirname, 'lib', 'symbol-property-name.js'),
      options: { symbolPropertyName }
    })
  }

  config.module.rules = [
    ...config.module.rules.filter(rule => (
      String(rule.test) !== imagesRuleTest
    )),

    rule,

    {
      ...imagesRule,
      test: new RegExp(imagesRuleTest.replace('svg|', '').slice(1, -1))
    }
  ]

  config.plugins = [
    ...config.plugins,
    new GatsbyTypescriptPluginFix(),
    new SvgStorePlugin(pluginOptions)
  ]

  actions.replaceWebpackConfig(config)
}
