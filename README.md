# gatsby-plugin-svg-sprite-loader

Gatsby plugin for creating SVG sprites using __[SVG sprite loader](https://github.com/JetBrains/svg-sprite-loader)__.

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

The `options` parameter is passed directly to __SVG sprite loader__, the documentation can be found on [SVG sprite loader documentation](https://github.com/JetBrains/svg-sprite-loader). By default, this plugin sets `extract` option to `true`, `spriteFilename` to `'sprites.[contenthash].svg'` and `symbolId` to `'[name]--[hash:base64:5]'` — the naming convention is the same used by Gatsby for CSS files.

### pluginOptions

The `pluginOptions` parameter is passed to `svg-sprite-loader/plugin`. If the images will only be referred using `<use xlinkHref='...'/>` — and never inside CSS or `<img>` elements — set `plainSprite` option to `true`, so __SVG sprite loader__ will generate a lighter output file.

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
