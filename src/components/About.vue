<template>
  <div class="bg-white dark:bg-slate-800 p-6 rounded-lg max-container">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">{{ $t('about.title') }}</h1>
    
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4 dark:text-slate-300">{{ $t('about.intro') }}</h2>
      <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
        {{ $t('about.description') }}
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4 dark:text-slate-300">{{ $t('about.tech_stack') }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="(tech, index) in data.about.technologies" 
          :key="index"
          class="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 flex items-center justify-center text-blue-600">
              <svg class="w-6 h-6" fill="currentColor">
                <use :xlink:href="tech.icon"></use>
              </svg>
            </div>
            <span class="font-medium text-slate-700 dark:text-slate-200">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- <section>
      <h2 class="text-xl font-semibold mb-4 dark:text-slate-300">{{ $t('about.team') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="(member, index) in $t('about.team_members')" 
          :key="member.name"
          class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
        >
          <h3 class="font-medium text-slate-800 dark:text-slate-200">{{ member.name }}</h3>
          <p class="text-slate-600 dark:text-slate-400 mt-2">{{ member.role }}</p>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script setup>
import data from '../config.js'

const getTechIcon = (tech) => {
  const icons = {
    'Vue.js': '#icon-vue',
    'Tailwind CSS': '#icon-tailwind',
    'Arco Design': '#icon-arco',
    'Vite': '#icon-vite'
  }
  return icons[tech] || '#icon-code'
}
</script>

<style scoped>
.max-container {
  max-width: 1580px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 84vh;
}
</style>