# gatsby-plugin-svg-sprite-loader

Gatsby plugin for creating SVG sprites using [External SVG Sprite][1].

[1]: https://github.com/bensampaio/external-svg-sprite-loader

## Install

```bash
$ npm install gatsby-plugin-svg-sprite-loader
```

## Configure

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-svg-sprite-loader`,
      options: {
        /* External SVG Sprite loader options */
        pluginOptions: {
          /* External SVG Sprite plugin options */
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

## Updating from v0.1.* to v0.2.*

While v0.1.* uses __SVG sprite loader__ under the hood, v0.2.* uses
__External SVG Sprite__. The new package returns the sprite url using the
`symbol` property, while __SVG sprite loader__ uses `url`. A patch was created
to return the value inside the `url` property, among with `symbol`. If the
default options were being used in v0.1.*, no difference should be noticed.

## License

[The MIT License](./LICENSE)
