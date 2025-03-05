import { defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import path from 'path'
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VueI18nPlugin({
      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './src/locales/**')
    }), envCompatible()],
    cssCodeSplit: false,
    base: '/',
    resolve: {
      alias: {
        '@': '/src', // 默认配置
        '@utils': '/src/script'
      }
    }
  })


