<template>
  <footer class="bg-white dark:bg-slate-800 border-t mt-8 py-6 sticky bottom-0">
    <div class="max-container">
      <div class="flex flex-wrap gap-6 justify-center md:justify-between">
        <div class="flex items-center space-x-4 text-sm">
          <router-link 
            class="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
            :to="{ name: 'Changelog' }">
            {{ $t('footer.changelog') }}
          </router-link>
          <router-link
            class="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
            :to="{ name: 'contact' }">
            {{ $t('footer.contact') }}
          </router-link>
          <router-link
            class="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
            :to="{ name: 'about' }">
            {{ $t('footer.about') }}
          </router-link>
        </div>
        <div class="text-slate-500 dark:text-slate-400 text-sm">
          © 2024 LConv. {{ $t('footer.rights') }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.max-container {
  max-width: 1580px;
  margin: 0 auto;
  padding: 0 1rem;
}

footer {
  z-index: 10;
}
</style>