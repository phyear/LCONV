<template>
   <div class="h-full flex mt-2 text-slate-500">
      <div class="gen_l">
         <div class="w-full flex-col space-y-2 text-slate-600 font-medium">
            <div class="w-full flex-col space-y-2 text-slate-600 font-medium">
               <span class="dark:text-white mr-3">{{ $t('gen.yaml.op.prefix') }}</span>
               <a-input :style="{ width: '100px' }" default-value="example" allow-clear v-model="prefix" />
            </div>
            <div class="flex items-center gap-x-2 dark:text-white">
               <span>{{ $t("gen.yaml.op.keyValue") }}</span>
               <a-switch v-model="keyValue" checked-value="true" unchecked-value="false" type="round" />
            </div>
         </div>
      </div>

         <div class="w-9/12">
            <a-textarea class="gen_r " v-model="dataStr" />
         </div>
         <div style="display: none;">{{ ww }}</div>
      </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { dataHandle } from '../../../context/TransferContext.js'
import { rowColNumberStore } from '../../../store/RowColNumber'
import { storeToRefs } from 'pinia'
const counterStore = rowColNumberStore()
const { toType, data, sourceText } = storeToRefs(counterStore)

const prefix = ref("example")

const keyValue = ref('true')

const dataStr = ref('')

const ww = computed(() => {
   let config = {
      keyValue: keyValue.value,
      prefix: prefix.value
   }
   const datas = [...data.value]
   let res = dataHandle[toType.value.code].toGenData(datas, config)
   dataStr.value = res
   counterStore.setGenText(dataStr.value);
   return datas
})



</script>

<style></style>