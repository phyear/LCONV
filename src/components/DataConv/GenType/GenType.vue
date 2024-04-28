<template>
     <component :is="getToType.code ? tabs[getToType.code] : 'aa'"></component>
</template>

<script setup>
  import {computed, ref} from 'vue'
  import excel from './Excel.vue'
  import json from './Json.vue'
  import { rowColNumberStore } from '../../../store/RowColNumber'
  import { storeToRefs } from 'pinia'
  const rowColNumber = rowColNumberStore()
  const { getToType } = storeToRefs(rowColNumber)

  const tabs = {excel, json}
  
</script>