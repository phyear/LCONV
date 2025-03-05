<template>
   <div class="table-container">
       <table border="1" cellspacing="2" style="border-collapse: collapse;"  class="modern-table">
         <tr  v-for="(row,rowIndex) in 20" :key="rowIndex" >
            <td
               class="table-cell"
               v-for="(cell, cellIndex) in 20"
               :key="cellIndex"
               @mouseover="handleMouseOver(rowIndex, cellIndex)"
               :class="{ 'highlighted': rowIndex <= rowCount && cellIndex <= colCount }"
               @click="updateRowColNumber(rowIndex + 1, cellIndex + 1)"
            ></td>
         </tr>
       </table>
       </div>
</template>

<script setup>
   import { ref, defineProps, onMounted } from 'vue'
   import { rowColNumberStore } from '../..//store/RowColNumber'
   import { Notification } from '@arco-design/web-vue';


   const counterStore = rowColNumberStore()
   const rowCount = ref(counterStore.row - 1)
   const colCount = ref(counterStore.col - 1)
   onMounted(() => {
   })
   const handleMouseOver = (rowIndex, cellIndex) => {
        rowCount.value = rowIndex
        colCount.value = cellIndex
   }

   const notify = () => {
      Notification.success({
            title: 'Table resized',
            style: { }
      })
   }

   const updateRowColNumber = (row, col) => {
      counterStore.row = row
      counterStore.col = col
      counterStore.hidden = true
      const source = completedBlankLine(row, col)
      counterStore.sourceData =  source
      counterStore.setHistoryData(source)  
      notify()
   }

   const completedBlankLine = (row, col) => {
      const data = counterStore.sourceData;
      const oldRow = data.length
      const oldCol = data[0].length
      // 如果行数大于当前行数 则减去后面的行
      if(oldRow > row){
         for(var i = 0; i < (oldRow - row); i++) {
            data.pop()
         }
      } else {
         for(var i = 0; i < (row - oldRow); i++) {
            data.push([])
         }
      }

      // 如果列数大于单签行的列数 则减去后面的列
      if(oldCol > col){
         for(var i = 0; i < (oldCol - col); i++) {
            data.forEach(item => {
               item.pop()
            })
         }
      } else {
         for(var i = 0; i < (col - oldCol); i++) {
            data.forEach(item => {
               item.push('')
            })
         }
      }

      return data

   } 
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: #e2e8f0;
}

.modern-table {
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.table-cell {
  width: 12px;
  height: 12px;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.table-cell.highlighted {
  background-color: #bfdbfe;
}

.table-cell:hover {
  background-color: #e2e8f0;
}
</style>

