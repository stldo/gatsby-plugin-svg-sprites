# gatsby-plugin-svg-sprites

Gatsby plugin for creating SVG sprites using [External SVG Sprite][1].

[1]: https://github.com/bensampaio/external-svg-sprite-loader

## Install

```bash
$ npm install gatsby-plugin-svg-sprites
```

## Configure

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-svg-sprites`,
      options: {
        /* ...External SVG Sprite loader options */
        pluginOptions: {
          /* ...External SVG Sprite plugin options */
        }
      },
    },
  ],
}
```

## Options

### options

Default:
`{ name: 'sprites.[contenthash].svg', iconName: '[name]--[hash:base64:5]' }`;
Type: `Object`.

The `options` object is passed directly to __External SVG Sprite__ loader, more
info can be found [here][2]. To keep consistency, `name` and `iconName` default
values use the same formats used by Gatsby.js for CSS files.

[2]: https://github.com/bensampaio/external-svg-sprite-loader#options

### pluginOptions

Default: `{}`; Type: `Object`.

The `pluginOptions` parameter is passed to __External SVG Sprite__ plugin.

## Usage

```javascript
import React from 'react'
import icon from 'images/icon.svg'

export default () => (
  <svg viewBox={icon.viewBox}>
    <use xlinkHref={icon.url}/>
  </svg>
)
```

```css
.icon {
  background-image: url('images/icon.svg') no-repeat 0;
}
```

## License

[The MIT License](./LICENSE)
