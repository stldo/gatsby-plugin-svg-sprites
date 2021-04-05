const SvgStorePlugin = require('external-svg-sprite-loader')
const path = require('path')

const gatsbyTypescriptPluginFix = require('./lib/gatsby-typescript-plugin-fix')

exports.onCreateWebpackConfig = (
  { actions, getConfig, rules },
  { pluginOptions = {}, _: plugins /* Skip 'plugins' property */, ...options }
) => {
  const config = getConfig()
  const imagesRule = rules.images()
  const imagesRuleTest = String(imagesRule.test)

  const loaderOptions = {
    name: 'sprites.[contenthash].svg',
    iconName: '[name]--[hash:base64:5]',
    ...options
  }

  config.module.rules = [
    ...config.module.rules.filter(rule => (
      String(rule.test) !== imagesRuleTest
    )),

    {
      test: /\.svg$/,
      use: [
        path.resolve(__dirname, './lib/external-svg-sprite-loader-patch'),
        { loader: SvgStorePlugin.loader, options: loaderOptions },
      ]
    },

    {
      ...imagesRule,
      test: new RegExp(imagesRuleTest.replace('svg|', '').slice(1, -1))
    }
  ]

  config.plugins = [
    ...config.plugins,
    new gatsbyTypescriptPluginFix(),
    new SvgStorePlugin(pluginOptions)
  ]

  actions.replaceWebpackConfig(config)
}
