<template>
    <div class="max-w-screen-2xl m-auto flex  flex-wrap gap-4">
       <div class="flex md:w-1/4 lg:w-1/6 bg-white dark:bg-slate-600 rounded-xl sm:w-1/2 p-3" v-for="(item,i) in data" v-bind:key="i"> 
            <div class="w-8 h-8 rounded-full flex justify-center items-center" :style="{'background-color': item.color ? item.color : 'rgb(59 130 246)'}">
              <svg class="icon text-xl flex text-slate-100" aria-hidden="true">
               <use v-bind:xlink:href="item.icon"></use>
              </svg>
            </div>
            <div class="pl-2 dark:text-slate-300">
               <p class="font-bold">
                  {{ item.name }}
               </p>
               <p class="text-sm dark:text-slate-300">
                  {{ item.description }}
               </p>
            </div>
       </div>
  </div>
</template>

<script setup>
    import { onMounted, reactive, ref } from 'vue';
    import {all_trans} from '../util/source';
    const data = reactive([]);
    onMounted(() => {
        data.push(...all_trans);
    });
   
</script>