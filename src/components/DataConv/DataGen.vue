<template>
    <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-800 bg-white rounded-md flex flex-col gap-6 mb-8">
        <div class="rounded-md flex items-center gap-x-2 justify-between">
            <div class="flex items-center gap-x-2">
                <div class="w-8 h-8 rounded-full flex justify-center items-center"
                    :style="{ 'background-color': 'rgb(59 130 246)' }">
                    <svg class="icon  text-xl flex text-slate-100" aria-hidden="true">
                        <use v-bind:xlink:href="true ? '#icon-CSV' : '#icon-CSV'"></use>
                    </svg>
                </div>
                <div class="text-lg font-bold dark:text-white">Data Gen </div>
            </div>
            <div class="flex gap-2">
                <a-button 
                    class="bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                    <template #icon>
                        <icon-copy />
                    </template>
                    {{ $t('gen.btn.copy') }}
                </a-button>
                <a-button class="bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                    <template #icon>
                        <icon-download />
                    </template>
                    {{ $t('gen.btn.download') }}
                </a-button>
            </div>
        </div>
        <div>
            <div class="w-full text-white font-bold dark:bg-slate-700">
                <div class="p-2 bg-slate-100 dark:bg-slate-700 flex items-center justify-start gap-x-4">
                    <a-button v-for="(item, index) in canTrans"
                     class="bg-slate-100  hover:bg-blue-600 hover:text-white font-medium dark:bg-slate-700  dark:hover:bg-blue-600 dark:hover:text-white" :class="{ active : item.code === getToTypeCode }" 
                     @click="btnClick(item.code)"
                     >{{ item.name }} </a-button>
                </div>
            </div>

            <div class="w-full  h-60 dark:bg-slate-700">
                <GenType/>
            </div>
        </div>

    </div>
</template>

<script setup>
    import GenType from '../DataConv/GenType/GenType.vue'
    import { rowColNumberStore } from '../../store/RowColNumber'
    import { storeToRefs } from 'pinia'
    import { code_type } from '../../util/source.js'

    const counterStore = rowColNumberStore()
    const { canTrans , toType, getToTypeCode} = storeToRefs(counterStore)
    
    const btnClick = (key) => {
        counterStore.setToType(code_type[key])
    }
</script>

<style scoped>
   .active {
     background-color: rgb(37 99 235) !important;
     color: white !important;
   }
</style>
