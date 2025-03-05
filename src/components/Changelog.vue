<template>
  <div class="bg-white dark:bg-slate-800 p-6 rounded-lg max-container">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">{{ $t('changelog.title') }}</h1>
    
    <div class="space-y-6">
      <div 
        v-for="(version, index) in data.changelog.versions" 
        :key="index"
        class="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {{ version.number }}
          </h3>
          <span class="text-sm text-slate-500 dark:text-slate-400">
            {{ version.date }}
          </span>
        </div>
        <ul class="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
          <li v-for="(item, i) in version.features" :key="i">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '../config.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.max-container {
  max-width: 1580px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>