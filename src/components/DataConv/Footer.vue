<template>
  <footer class="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-t border-slate-200 dark:border-slate-700 py-8 relative overflow-hidden">
    <div class="max-container">
      <div class="flex flex-wrap gap-y-6 justify-between items-center">
        <div class="flex items-center space-x-6">
          <router-link 
            class="group flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-all duration-300"
            :to="{ name: 'Changelog' }">
            {{ $t('footer.changelog') }}
          </router-link>
          <router-link
            class="text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
            :to="{ name: 'contact' }">
            {{ $t('footer.contact') }}
          </router-link>
          <router-link
            class="text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors"
            :to="{ name: 'about' }">
            {{ $t('footer.about') }}
          </router-link>
        </div>
        <div class="text-slate-600 dark:text-slate-400 text-sm bg-indigo-50/60 dark:bg-slate-700/90 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
          © 2024 LConv. {{ $t('footer.rights') }}
        </div>
      </div>
    </div>
    <div class="absolute -bottom-4 left-1/2 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl opacity-40"></div>
  </footer>
</template>

<style scoped>
.max-container {
  max-width: 1580px;
  margin: 0 auto;
  padding: 0 2rem;
}

footer {
  z-index: 10;
  margin-top: auto;
  position: relative;
}

@media (max-width: 768px) {
  .max-container {
    padding: 0 1rem;
  }
}
</style>