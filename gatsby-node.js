const SvgStorePlugin = require('external-svg-sprite-loader')
const { resolve } = require('path')

const GatsbyTypescriptPluginFix = require('./lib/gatsby-typescript-plugin-fix')
const getOptimizedIconName = require('./lib/get-optimized-icon-name')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

exports.onCreateWebpackConfig = ({ actions, getConfig, rules }, {
  addSymbolPropertyName = false,
  plugins: _,
  pluginOptions = {},
  optimize = IS_PRODUCTION,
  ...externalSvgSpriteLoaderOptions
}) => {
  const config = getConfig()
  const imagesRule = rules.images()
  const imagesRuleTest = String(imagesRule.test)

  config.module.rules = [
    ...config.module.rules.filter(rule => (
      String(rule.test) !== imagesRuleTest
    )),

    {
      test: /\.svg$/,
      use: [{
        loader: resolve(__dirname, 'lib', 'add-symbol-property-name.js'),
        options: {
          addSymbolPropertyName
        }
      }, {
        loader: SvgStorePlugin.loader,
        options: {
          name: 'sprites.[contenthash].svg',
          iconName: optimize ? getOptimizedIconName : '[name]--[hash:base64:5]',
          ...externalSvgSpriteLoaderOptions
        }
      }]
    },

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
