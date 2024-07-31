<template>
   <div class="h-full flex mt-2 text-slate-500">
          <div class="gen_l">
             <div class = "w-full flex-col space-y-2 text-slate-600 font-medium">
                <div class="dark:text-white">{{ $t('gen.csv.op.title') }}</div>
                <a-select v-model="type" class="w-25">
                   <a-option value="," :label="$t('gen.csv.op.comma')" />
                   <a-option value="t" :label="$t('gen.csv.op.tab')" />
                   <a-option value=";" :label="$t('gen.csv.op.semicolon')" />
                   <a-option value=":" :label="$t('gen.csv.op.colon')" />
                   <a-option value="|" :label="$t('gen.csv.op.pipe')" />
                   <a-option value="/" :label="$t('gen.csv.op.slash')" />
                   <a-option value="#" :label="$t('gen.csv.op.octo')" />
                </a-select>
             </div>
          </div>
 
          <div class ="w-9/12">
             <a-textarea class="gen_r " v-model="dataStr"/>
          </div>
          <div style="display: none;">{{ ww }}</div>   
    </div>
 </template>
 
 <script setup> 
    import { computed, reactive, ref} from 'vue'
    import {dataHandle} from '../../../context/TransferContext.js'
    import { rowColNumberStore } from '../../../store/RowColNumber'
    import { storeToRefs } from 'pinia'
    const counterStore = rowColNumberStore()  
    const { toType, data, sourceText}= storeToRefs(counterStore)
    
    const type = ref(",")
 
    const dataStr = ref('')
 
    const ww = computed(() => {
       let config = {
          type: type.value
       }
       const datas = [...data.value]
       let res = dataHandle[toType.value.code].toGenData(datas, config)
       dataStr.value = res
       counterStore.setGenText(dataStr.value);
       return datas
    })
 
    
 
 </script>
 
 <style>
   
 </style>