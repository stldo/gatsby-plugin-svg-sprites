# gatsby-plugin-svg-sprites [![npm][1]][2]

> ⚠️ __Breaking change:__ `svg.symbol` property was renamed to `svg.url` in
> v4.2.0.

Gatsby plugin to generate SVG sprites from imported files. The sprites are
generated using [External SVG Sprite][3].

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

### External SVG Sprite options

Any other option passed to `gatsby-plugin-svg-sprites` will be passed to
`external-svg-sprite-loader` — more info about its options can be found
[here][4]. By default, this plugin will set the following options:

```js
{
  iconName: '[name]--[hash:base64:5]',
  name: 'sprites.[contenthash].svg'
}
```

> Note: if `minifyIds` is set to `true`, `iconName` will be ignored.

## License

[The MIT License][license]

[1]: https://img.shields.io/npm/v/gatsby-plugin-svg-sprites
[2]: https://www.npmjs.com/package/gatsby-plugin-svg-sprites
[3]: https://github.com/bensampaio/external-svg-sprite-loader
[4]: https://github.com/bensampaio/external-svg-sprite-loader#options
[license]: ./LICENSE
