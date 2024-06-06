<template>
  <div class="h-full flex mt-2 text-slate-500">
         <div class="gen_l">
            <a-checkbox-group v-model="op" class="flex flex-col space-y-2 font-medium">
               <a-checkbox v-for="item in opOptions" :value="item.value" class="text-slate-100">{{ $t(item.label) }}</a-checkbox>
            </a-checkbox-group>

            <div class = "w-full flex-col space-y-2 text-slate-600 font-medium">
               <div>{{ $t('gen.md.op.title') }}</div>
               <a-select v-model="type" class="w-25">
                  <a-option value="left" :label="$t('gen.md.op.left')" />
                  <a-option value="center" :label="$t('gen.md.op.center')" />
                  <a-option value="right" :label="$t('gen.md.op.right')" />
               </a-select>
            </div>
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

   const op = ref(['pretty', 'first'])
   const opOptions = [
      { label: 'gen.md.type.escape', value: 'escape' },
      { label: 'gen.md.type.first', value: 'first' },
      { label: 'gen.md.type.pretty', value: 'pretty' },
      { label: 'gen.md.type.simple', value: 'simple' },
      { label: 'gen.md.type.bold_first_row', value: 'bold_first_row' },
      { label: 'gen.md.type.bold_first_col', value: 'bold_first_col' },
   ]

   const type = ref("left")

   const dataStr = ref('')

   const ww = computed(() => {
      let config = {
         op: op.value,
         type: type.value
      }
      const datas = [...data.value]
      let res = dataHandle[toType.value.code].toGenData(datas, config)
      dataStr.value = res
      return datas
   })

   

</script>

<style>
  .arco-checkbox-icon {
     width: 20px !important;
     height: 20px !important;
  }
  .arco-checkbox-icon-check { 
    transform-origin: center 57% !important;
  }
  .arco-checkbox-checked .arco-checkbox-icon-check {
   transform: scale(1.9) !important; 
  }
  .arco-checkbox-icon {
    border: 2px solid var(--color-border-4) !important;
  }

  .arco-checkbox-checked .arco-checkbox-icon {
    background-color: rgb(var(--primary-6));
    border-color: transparent !important;
  }
 
</style>