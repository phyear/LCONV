import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueI18nPlugin({
    // you need to set i18n resource including paths !
    include: path.resolve(__dirname, './src/locales/**')
  })],
  cssCodeSplit: false,
  base: '/',
  resolve: {
    alias: {
      '@': '/src', // 默认配置
      '@utils': '/src/script'
    }
  }
})
