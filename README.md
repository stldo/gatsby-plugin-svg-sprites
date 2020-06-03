# gatsby-plugin-svg-sprite-loader

Gatsby plugin for creating SVG sprites using
[SVG sprite loader](https://github.com/JetBrains/svg-sprite-loader).

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

## Options

### options

Default: `{ extract: true, spriteFilename: 'sprites.[contenthash].svg', symbolId: '[name]--[hash:base64:5]' }`. Type: `Object`.

The `options` object is passed directly to __SVG sprite loader__, more info can
be found [here](https://github.com/JetBrains/svg-sprite-loader#configuration).
To maintain consistency, `spriteFilename` and `symbolId` formatting are to the
same formats used by Gatsby.js for CSS files.

### pluginOptions

Default: `{}`. Type: `Object`.

The `pluginOptions` parameter is passed to `svg-sprite-loader/plugin` — if
`extract` is set to `true` in the `options` parameter. If the sprites are used
only inside `<use xlinkHref='...'/>` — and never referenced in CSS files or as
`src` attribute of `<img>` elements — set `plainSprite` option to `true` to
allow __SVG sprite loader__ to generate a smaller output.

## Usage

If `extract` mode is enabled (set to `true` by default), use `sprite.url` in
`xlinkHref` prop. Otherwise, use `sprite.id`.

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

## Known bugs

There's an open bug on __SVG sprite loader__ that wasn't fixed yet (more info on
[#334](https://github.com/JetBrains/svg-sprite-loader/issues/334),
[#337](https://github.com/JetBrains/svg-sprite-loader/issues/337) and
[#363](https://github.com/JetBrains/svg-sprite-loader/issues/363)
), which generates invalid ESM code in some specific situations. If you're
having some troubles, try setting the option `esModule` to `false`.

## License

[The MIT License](./LICENSE)
