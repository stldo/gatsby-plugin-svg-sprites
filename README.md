# gatsby-plugin-svg-sprites [![npm][1]][2]

> ⚠️ If you are getting "sprites.[contenthash].svg" URLs in production, please
> check the "[Known issues][3]" section for possible solutions.

Gatsby plugin to generate SVG sprites from imported files. The sprites are
generated using [External SVG Sprite][4].

## Installation

```sh
npm install gatsby-plugin-svg-sprites
```

## Usage

```js
/* gatsby-config.js */

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-svg-sprites'
      options: {
        /* gatsby-plugin-svg-sprites options here */
      }
    }
  ]
}
```

### JavaScript import

```js
import React from 'react'
import icon from 'images/icon.svg'

export default () => (
  <svg viewBox={icon.viewBox}>
    <use xlinkHref={icon.url}/>
  </svg>
)
```

### CSS

```css
.icon {
  background-image: url('images/icon.svg') no-repeat 0;
}
```

## Options

### minifyIds

Type: `boolean`. Default: `process.env.NODE_ENV === 'production'`.

Minify symbol ids, enabled if `process.env.NODE_ENV === 'production'` by
default.

### pluginOptions

Type: `Object`. Default: `{}`.

The `pluginOptions` parameter is passed to __External SVG Sprite__ plugin.

### randomContentHash

Type: `boolean`. Default: `false`.

Allow this plugin to replace `'[contenthash]'` placeholder in the `name`
property with a random hash.

### External SVG Sprite options

Any other option passed to `gatsby-plugin-svg-sprites` will be passed to
`external-svg-sprite-loader` — more info about its options can be found
[here][5]. By default, this plugin will set the following options:

```js
{
  iconName: '[name]--[hash:base64:5]',
  name: 'sprites.[contenthash].svg'
}
```

> Note: if `minifyIds` is set to `true`, `iconName` will be ignored.

## Known issues

There's an issue that affects some projects, where the underlying loader renders
the source content before the plugin processes the path strings — resulting in
SVG URLs like "sprites.[contenthash].svg", and thus 404 responses. There are two
ways to circumvent this issue: removing any webpack placeholder from the `name`
option — setting it to something like "sprites.svg"; or setting
`randomContentHash` option to `true` — it enables this plugin to replace the
"[contenthash]" placeholder in the `name` property with random hashes. If you
are using Netlify or another service that implements HTTP ETags for cache
invalidation, you can safely use a plain filename like `sprites.svg`. Otherwise,
enabling `randomContentHash` could be a better choice.

## License

[The MIT License][license]

[1]: https://img.shields.io/npm/v/gatsby-plugin-svg-sprites
[2]: https://www.npmjs.com/package/gatsby-plugin-svg-sprites
[3]: #known-issues
[4]: https://github.com/bensampaio/external-svg-sprite-loader
[5]: https://github.com/bensampaio/external-svg-sprite-loader#options
[license]: ./LICENSE
