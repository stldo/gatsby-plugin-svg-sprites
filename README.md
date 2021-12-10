# gatsby-plugin-svg-sprites

Gatsby plugin to generate SVG sprites from imported files. The sprites are
generated using [External SVG Sprite][1].

## Install

```sh
$ npm install gatsby-plugin-svg-sprites
```

Enable the plugin in `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    `gatsby-plugin-svg-sprites`
  ]
}
```

## Usage

### JavaScript

```js
import React from 'react'
import icon from 'images/icon.svg'

export default () => (
  <svg viewBox={icon.viewBox}>
    <use xlinkHref={icon.symbol}/>
  </svg>
)
```

### CSS

```css
.icon {
  background-image: url('images/icon.svg') no-repeat 0;
}
```

## Configure

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-svg-sprites`,
      // options: {
      //   addSymbolPropertyName: false,
      //   optimize: process.env.NODE_ENV === 'production',
      //   pluginOptions: {
      //     // ...External SVG Sprite plugin options
      //   }
      //   // ...External SVG Sprite loader options
      // }
    }
  ]
}
```

### options

Type: `Object`.
Default:
`{ name: 'sprites.[contenthash].svg', iconName: '[name]--[hash:base64:5]' }`.

The `options` object is passed to __External SVG Sprite__ loader — more info
about it can be found [here][2]. To keep consistency, `name` and `iconName`
default values use the same formats used by Gatsby.js for CSS files.

### addSymbolPropertyName

Type: `string` or `false`. Default: `false`.

By default, __External SVG Sprite__ returns the URL in the `symbol` property.
This option adds another property name to access this value.

— With `addSymbolPropertyName` set to `url`:

```js
import React from 'react'
import icon from 'images/icon.svg'

export default () => (
  <svg viewBox={icon.viewBox}>
    <use xlinkHref={icon.url}/> // Access the sprite URL using `url` property
  </svg>
)
```

### optimize

Type: `boolean`. Default: `process.env.NODE_ENV === 'production'`.

With `optimize` enabled, the sprites ids will be minified. By default, it is
enabled on production environments.

### pluginOptions

Type: `Object`. Default: `{}`.

The `pluginOptions` parameter is passed to __External SVG Sprite__ plugin.

## License

[The MIT License][license]

[1]: https://github.com/bensampaio/external-svg-sprite-loader
[2]: https://github.com/bensampaio/external-svg-sprite-loader#options
[license]: ./LICENSE
