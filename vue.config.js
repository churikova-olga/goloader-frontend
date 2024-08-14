const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/': {
        target: 'http://localhost:8080'
      }
    }
  }
})
