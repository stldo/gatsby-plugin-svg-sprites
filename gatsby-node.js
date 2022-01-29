const SvgStorePlugin = require('external-svg-sprite-loader')
const { resolve } = require('path')

const GatsbyTypescriptPluginFix = require('./lib/gatsby-typescript-plugin-fix')
const getMinifiedId = require('./lib/get-minified-id')

exports.onCreateWebpackConfig = ({ actions, getConfig, rules }, {
  iconName = '[name]--[hash:base64:5]',
  minifyIds = process.env.NODE_ENV === 'production',
  pluginOptions = {},
  plugins: _,
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
        loader: resolve(__dirname, 'lib', 'symbol-property-name.js'),
        options: { symbolPropertyName: 'url' }
      }, {
        loader: SvgStorePlugin.loader,
        options: {
          name: 'sprites.[contenthash].svg',
          iconName: minifyIds ? getMinifiedId : iconName,
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
