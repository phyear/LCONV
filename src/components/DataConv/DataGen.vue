<template>
    <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-800 bg-white rounded-md flex flex-col gap-6 mb-8">
        <div class="rounded-md flex items-center gap-x-2 justify-between">
            <div class="flex items-center gap-x-2">
                <div class="w-7 h-7 rounded-full flex justify-center items-center"
                    :style="{ 'background-color': toType.color }">
                    <svg class="icon  text-sm flex text-slate-100" aria-hidden="true">
                        <use v-bind:xlink:href="toType.icon"></use>
                    </svg>
                </div>
                <div class="text-lg font-bold dark:text-white">Data Gen </div>
            </div>
            <div class="flex gap-2">
                <a-button 
                    class="bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    @click="copyToClipboard" v-if="toType.copy == true">
                    <template #icon>
                        <icon-copy />
                    </template>
                    {{ $t('gen.btn.copy') }}
                </a-button>
                <a-button 
                   class="bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                   v-if="toType.download == true"
                   @click="downloadToFile">
                    <template #icon>
                        <icon-download />
                    </template>
                    {{ $t('gen.btn.download') }}
                </a-button>
            </div>
        </div>
        <div>
            <div class="w-full text-white font-bold dark:bg-slate-700">
                <div class="p-2 flex flex-wrap bg-slate-100 dark:bg-slate-700  items-center justify-start gap-x-4">
                    <a-button v-for="(item, index) in getCanTran"
                     class="bg-slate-100  hover:bg-blue-600 hover:text-white font-medium dark:bg-slate-700  dark:hover:bg-blue-600 dark:hover:text-white" :class="{ active : item.code === getToTypeCode }" 
                     @click="btnClick(item.code)">{{ item.name }} </a-button>
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
    import { dataHandle } from '../../context/TransferContext'

    const counterStore = rowColNumberStore()
    const {toType, getToTypeCode, sourceData, getSource, getCanTran, getCodeType} = storeToRefs(counterStore)
    import { Notification } from '@arco-design/web-vue';
      import { writeText } from 'clipboard-polyfill';

    
    const btnClick = (key) => {
        counterStore.setToType(getCodeType.value[key])
    }
  
    const copyToClipboard = async() => {
    try {
        await writeText(counterStore.genText).then(() => {
            Notification.success({
            title: 'Copied to clipboard',
            style: { }
            })
        });
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
    }
    }

    const downloadToFile = () => {
        if(toType.value.download){
            // 根据不同类型执行不同的下载文件功能
            const blob = dataHandle[toType.value.code].toFile(sourceData.value, counterStore.genText);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data' + toType.value.accept;
            a.click();
            URL.revokeObjectURL(url);
        } else {
            Notification.error({
            title: '该类型不支持下载',
            style: { }
           })
        }   
      }
</script>

<style scoped>
   .active {
     background-color: rgb(37 99 235) !important;
     color: white !important;
   }
</style>
