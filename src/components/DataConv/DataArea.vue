<template>
  <div class="h-100">
    <hot-table :data="data" :rowHeaders="true" ref="hotTables"
  :colHeaders="true" 
   licenseKey="non-commercial-and-evaluation" 
   :settings="settings"></hot-table>
   <div style="display: none;">{{ ww }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch} from "vue";
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import { rowColNumberStore } from '../../store/RowColNumber'
import { storeToRefs } from 'pinia'

const counterStore = rowColNumberStore()
const { row, col, sourceData, getSourceData } = storeToRefs(counterStore)

  registerAllModules()

  var data = ref(sourceData);
  const settings = {
    contextMenu: true,
    height: 300,
  };

  const ww = computed(() => {
     data.value = setData();

     return col.value
  })


  const hotTables = ref(null);

  watch(sourceData, (newValue, oldValue) => {
    data.value = setData();
    hotTables.value.hotInstance.loadData(data.value);
  });

  
  onMounted(() => {
    hotTables.value.hotInstance.addHook('afterChange', (row, column, valueHolder, ioMode) => {
        counterStore.updateSourceData(data.value)
    });
    hotTables.value.hotInstance.addHook('afterCreateRow', (index, amount) => {
        counterStore.updateSourceData(data.value)
    });
    hotTables.value.hotInstance.addHook('afterCreateCol', (index, amount) => {
        counterStore.updateSourceData(data.value)
    });
  })


 const setData = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    return sourceData.value
  } else {
    var rowData = []
    for (let i = 0; i < row.value; i++) {
      var row = []  
      for (let j = 0; j < col.value; j++) {
        row.push(null)
      }
      rowData.push(row)
    }
    return rowData
  }
}
</script>