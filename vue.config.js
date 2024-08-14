const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  // outputDir: path.resolve(__dirname, '../backend/public'),
  devServer: {
    proxy:{
      '/api':{
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    server: {
      type: 'https',
    }
  }
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:3000',
  //     changeOrigin: true,
  //     secure: false
  //   },
  //   '/': {
  //     target: 'http://localhost:8080'
  //   }
  // }
})
