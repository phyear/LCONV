<script setup>
import Nav from './components/DataConv/Nav.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue';
import Footer from './components/DataConv/Footer.vue'

import {localeStore} from './store/Locale.js'
import { storeToRefs } from 'pinia'

const localeS = localeStore()


const {getLocale} =  storeToRefs(localeS)

</script>

<template>
  <div>
    <SpeedInsights/>
    <a-config-provider :locale="getLocale">
      <!--导航条-->
      <Nav />
      <RouterView />
      <!--页脚组件-->
      <Footer />
    </a-config-provider>
  </div>
</template>

<style>
.max-container {
  max-width: 1580px;
  margin-left: auto;
  margin-right: auto;
  padding: .75rem
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

button {
  padding: 0px;
  margin: 0px;
}
</style>
