<template>
    <nav class="max-w-screen-2xl w-full flex mx-auto h-20">
    <div class="flex md:w-1/5  w-full">
      <div class="flex items-center">
        <svg class="icon text-4xl dark:text-blue-600 text-blue-600" aria-hidden="true">
          <use xlink:href="#icon-table"></use>
        </svg>
        <div class="ml-1 text-xl font-semibold text-slate-800 dark:text-slate-300">IConvert</div>
      </div>
    </div>
    <div class="flex md:w-4/5 w-full justify-around">
      <div class="flex items-center md:w-3/5 w-full ">
         <div >
           
         </div>
      </div>
      <div class="flex items-center">
         <div  @click="checkTheme" class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800   text-slate-900 dark:text-slate-100">
          <svg class="icon text-xl flex text-slate-500 dark:text-slate-500"  aria-hidden="true">
           <use v-bind:xlink:href="themeIcon"></use>
          </svg>
         </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
const dark = ref(false);
const themeIcon = ref('#icon-cc-month');
const checkTheme = () => {
  dark.value = !dark.value;
  if (dark.value == false) {
    document.documentElement.classList.add('dark');
    themeIcon.value = '#icon-sun';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.value = '#icon-cc-month';
  }
}
</script>