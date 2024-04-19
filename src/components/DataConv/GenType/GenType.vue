<template>
     <component :is="tabs[currentComponent]"></component>
</template>

<script setup>
  import {ref} from 'vue'
  import Excel from './Excel.vue'

  const currentComponent = ref('Excel')
  const tabs = {Excel}
</script>