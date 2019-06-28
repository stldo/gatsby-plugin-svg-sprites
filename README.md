# gatsby-plugin-svg-sprite-loader

Gatsby plugin for creating SVG sprites using [SVG sprite loader](https://github.com/kisenka/svg-sprite-loader).

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
        /* SVG sprite loader options */
        pluginOptions: {
          /* SVG sprite loader plugin options */
        }
      },
    },
  ],
}
```

### options

The `options` parameter is passed directly to SVG sprite loader, more info about these options can be found on [SVG sprite loader documentation](https://github.com/kisenka/svg-sprite-loader). By default, this plugin sets `extract` option to `true`, `spriteFilename` to `'sprites.[contenthash].svg'` and `symbolId` to `'[name]--[hash:base64:5]'`. The naming convention is the same as that used by Gatsby for CSS files.

### pluginOptions

The `pluginOptions` parameter is passed to `svg-sprite-loader/plugin`. If the items in the sprite will only be referred via `<use xlinkHref='...'/>`, and not in CSS or `<img>` elements, it is recommended to set `plainSprite` option to `true`, as it allows SVG sprite loader to generate a simpler output.

## Usage

If `extract` mode is enabled (set to `true` by default), use `sprite.url` in `xlinkHref` prop. Otherwise, use `sprite.id`.

```javascript
/* extract === true (default) */
import React from 'react'
import sprite from 'images/sprite.svg'

export default () => (
  <svg viewBox={sprite.viewBox}>
    <use xlinkHref={sprite.url}/>
  </svg>
)
```

```javascript
/* extract === false */
import React from 'react'
import sprite from 'images/sprite.svg'

export default () => (
  <svg viewBox={sprite.viewBox}>
    <use xlinkHref={sprite.id}/>
  </svg>
)
```

## License

[The MIT License](./LICENSE)
