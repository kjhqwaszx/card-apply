const CracoAlias = require('craco-alias')
// font preload
// const FontPreloadPlugin = require('webpack-font-preload-plugin')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  // webpack: {
  //   plugins: {
  //     // font preload
  //     add: [
  //       new FontPreloadPlugin({
  //         extensions: ['woff2'],
  //       }),
  //     ],
  //   },
  // },
}
