const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: process.env.MAIN_URL_KAMENKA2
  },
  transpileDependencies: true
})
