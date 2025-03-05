<template>
  <div class="h-full flex mt-2 text-slate-500">
    <div class="gen_l">
      <a-checkbox-group v-model="op" class="flex flex-col space-y-2 font-medium">
        <a-checkbox v-for="item in opOptions" :value="item.value" class="text-slate-100">{{ $t(item.label) }}</a-checkbox>
      </a-checkbox-group>

      <div class="w-full flex-col space-y-2 text-slate-600 font-medium">
        <div>{{ $t('gen.wikitable.op.title') }}</div>
        <a-select v-model="borderStyle" class="w-25">
          <a-option value="full" :label="$t('gen.wikitable.border.full')" />
          <a-option value="default" :label="$t('gen.wikitable.border.default')" />
        </a-select>
      </div>
    </div>

    <div class="w-9/12">
      <a-textarea class="gen_r" v-model="dataStr"/>
    </div>
    <div style="display: none;">{{ ww }}</div>   
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { dataHandle } from '../../../context/TransferContext.js'
import { rowColNumberStore } from '../../../store/RowColNumber'
import { storeToRefs } from 'pinia'

const counterStore = rowColNumberStore()
const { toType, data } = storeToRefs(counterStore)

const op = ref(['header'])
const borderStyle = ref('full')

const opOptions = [
  { label: 'gen.wikitable.type.header', value: 'header' },
  { label: 'gen.wikitable.type.merge', value: 'merge' }
]

const dataStr = ref('')

const ww = computed(() => {
  let config = {
    borderStyle: borderStyle.value,
    operations: op.value
  }
  const datas = [...data.value]
  let res = dataHandle[toType.value.code].toGenData(datas, config)
  dataStr.value = res
  counterStore.setGenText(dataStr.value);
})
</script>