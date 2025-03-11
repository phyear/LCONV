<template>
    <div class="max-w-screen-2xl m-auto flex flex-wrap gap-4 p-4">
       <div 
         class="flex flex-row min-w-[200px] flex-1 bg-white dark:bg-slate-700 rounded-xl p-6
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                cursor-pointer group hover:border-blue-100 dark:hover:bg-slate-800"
         v-for="(item,i) in data" 
         :key="i" 
         @click="transTo(item.pre_code, item.code)">
         <div 
           class="w-8 h-8 rounded-full flex justify-center items-center transition-colors"
           :style="{ backgroundColor: item.color || 'rgb(59 130 246)' }">
           <svg class="icon w-4/5 h-4/5 text-white" aria-hidden="true">
             <use :xlink:href="item.icon" />
           </svg>
         </div>
         <div class="flex flex-row items-center gap-x-4 pl-2">
           <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
             {{ item.name }}
           </p>
           <p class="text-xs text-slate-500 dark:text-slate-400 leading-tight">
             {{ item.description }}
           </p>
         </div>
       </div>
     </div>
</template>

<script setup>
    import { onMounted, reactive } from 'vue';
    import { storeToRefs } from 'pinia'
    import { rowColNumberStore } from '../../store/RowColNumber'

   const counterStore = rowColNumberStore()  
   const { getAllTrans } = storeToRefs(counterStore)
    const data = reactive([]);
    onMounted(() => {
        data.push(...getAllTrans.value);
    });

    const transTo = (preCode, endCode) => {
      let pre = code_type[preCode]
      let end = code_type[endCode]
      counterStore.setTypeInfo(pre, end);
    }
   
</script>