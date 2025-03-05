<template>
     <component :is="getToType.code ? tabs[getToType.code] : 'aa'"></component>
</template>

<script setup>
  import {computed, ref} from 'vue'
  import excel from './Excel.vue'
  import md from './Markdown.vue'
  import json from './Json.vue'
  import csv from './Csv.vue'
  import html from './Html.vue'
  import yaml from './Yaml.vue'
   import sql from './Sql.vue'
import wikitable from './WikiTable.vue'
  import { rowColNumberStore } from '../../../store/RowColNumber'
  import { storeToRefs } from 'pinia'
  const rowColNumber = rowColNumberStore()
  const { getToType } = storeToRefs(rowColNumber)

  const tabs = {excel, json, md, csv, html, yaml, sql, wikitable}
  
</script>