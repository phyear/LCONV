import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { createPinia } from 'pinia'
import { Notification } from '@arco-design/web-vue';


const app = createApp(App)
.use(ArcoVue)
.use(ArcoVueIcon)
.use(createPinia())
.mount('#app')