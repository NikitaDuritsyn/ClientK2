const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "C:/Users/KIT/Desktop/kamenka/dist_fe"),
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            mangle: true,
            output: {
              beautify: false,
            },
          },
        }),
      ],
    },
  },
  devServer: {
    proxy: process.env.MAIN_URL_KAMENKA2
  },
  transpileDependencies: true
});