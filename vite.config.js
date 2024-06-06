import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueI18n({
    // you need to set i18n resource including paths !
    include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
  })],
  cssCodeSplit: false,
  base: '/',
})
