<template>
  <div class="h-full flex mt-2 text-slate-500">
         <div class="gen_l" >
            <a-checkbox-group v-model="op" class="flex flex-col space-y-2 font-medium">
               <a-checkbox v-for="item in opOptions" :value="item.value" class="text-slate-100 dark:text-white">{{ $t(item.label) }}</a-checkbox>
            </a-checkbox-group>
         </div>

         <div class ="w-9/12">
            <a-textarea class="gen_r" v-model="dataStr"/>
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
   const { toType, data}= storeToRefs(counterStore)
   
   const type = ref(",")

   const op = ref([])
   const opOptions = [
      { label: 'gen.html.type.escape', value: 'escape' },
      { label: 'gen.html.type.div', value: 'div' },
      { label: 'gen.html.type.minify', value: 'minify' },
      { label: 'gen.html.type.thead', value: 'thead' },
      { label: 'gen.html.type.first_headers', value: 'first_headers' },
   ]

   const dataStr = ref('')

   const ww = computed(() => {
      let config = {
         op: op.value
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