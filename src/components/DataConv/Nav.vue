<template>
    <nav class="max-w-screen-2xl w-full flex mx-auto h-20">
    <div class="flex md:w-1/5  w-full">
      <div class="flex items-center">
        <svg class="icon text-2xl  fill-blue-600 stroke-2">
          <use xlink:href="#icon-table_icon"></use>
        </svg>
        <div class="ml-2 text-xl font-bold text-blue-600 dark:text-blue-600">LConv</div>
      </div>
    </div>
    <div class="flex md:w-4/5 w-full justify-around">
      <div class="flex items-center md:w-3/5 w-full ">
         <div >
           
         </div>
      </div>
      <div class="flex items-center space-x-2">
         <div  @click="checkTheme" class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800   text-slate-900 dark:text-slate-100">
          <svg class="icon text-xl flex text-blue-600 dark:text-blue-600"  aria-hidden="true">
           <use v-bind:xlink:href="themeIcon"></use>
          </svg>
         </div>
         
         <!--切换多语言-->
         <div>
            <a-dropdown trigger="hover">
              <a-button shape="circle" class="dark:bg-slate-800 bg-slate-200">
                <template #icon>
                  <div v-if="locale == 'zh_CN' || locale == 'zh'" class="flex items-center">
                     <icon-chinese-fill  class="w-6 h-6 text-blue-600 dark:text-blue-600" />
                  </div>
                  <div v-if="locale == 'en_US'" class="flex items-center">
                     <icon-english-fill  class="w-6 h-6 text-blue-600 dark:text-blue-600" />
                  </div>
                </template>
              </a-button>
              <template #content>
                <a-doption @click="setLocale('zh_CN')">中文</a-doption>
                <a-doption @click="setLocale('en_US')">English</a-doption>
              </template>
          </a-dropdown>
         </div>
         <!--设置github地址-->
         <a href="https://github.com/phyear/LCONV" class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800   text-slate-900 dark:text-slate-100">
            <icon-github class="w-6 h-6 text-blue-600 dark:text-blue-600" />
         </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, getCurrentInstance} from 'vue';
import {localeStore} from '../../store/Locale.js'
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';

const { t, locale } = useI18n();

const dark = ref(false);
const themeIcon = ref('#icon-moon');

const localeS = localeStore()

onMounted(() => {
   let theme = localeS.dark
   dark.value = theme == 'dark'
   checkTheme()

})

const checkTheme = () => {
  dark.value = !dark.value;
  if (dark.value == false) {
    document.documentElement.classList.add('dark');
    themeIcon.value = '#icon-sun';
    localeS.setDark('dark')
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.value = '#icon-moon';
    localeS.setDark('light')
  }
}

const setLocale = (value) => {
   localeS.setLocale(value)
   locale.value = value
}
</script>