const SvgStorePlugin = require('external-svg-sprite-loader')
const { resolve } = require('path')

const GatsbyTypescriptPluginFix = require('./lib/gatsby-typescript-plugin-fix')
const getOptimizedIconName = require('./lib/get-optimized-icon-name')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

exports.onCreateWebpackConfig = (
  { actions, getConfig, rules },
  { plugins: _, pluginOptions = {}, optimize = IS_PRODUCTION, ...options }
) => {
  const config = getConfig()
  const imagesRule = rules.images()
  const imagesRuleTest = String(imagesRule.test)

  const loaderOptions = {
    name: 'sprites.[contenthash].svg',
    iconName: optimize ? getOptimizedIconName : '[name]--[hash:base64:5]',
    ...options
  }

  config.module.rules = [
    ...config.module.rules.filter(rule => (
      String(rule.test) !== imagesRuleTest
    )),

    {
      test: /\.svg$/,
      use: [
        resolve(__dirname, './lib/external-svg-sprite-loader-patch.js'),
        { loader: SvgStorePlugin.loader, options: loaderOptions }
      ]
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
