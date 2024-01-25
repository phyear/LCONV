<template>
       <table border="1" cellspacing="2" style="border-collapse: collapse; z-index: 100;" >
         <tr  v-for="(row,rowIndex) in 20" :key="rowIndex" >
            <td style = "width: 12px; height: 12px;border:1px solid #eeeeee" v-for="(row,cellIndex) in 20" :key="cellIndex"  @mouseover="handleMouseOver(rowIndex, cellIndex)"
            :style="{backgroundColor: rowIndex <= rowCount && cellIndex <= colCount  ? 'rgb(191 219 254)' : 'white'}"
             @click="$emit('update', rowIndex + 1, cellIndex + 1)">
            </td>
         </tr>
       </table>
</template>

<script setup>
   import { ref, defineProps, onMounted } from 'vue'
   const props = defineProps(['rowCol'])
   defineEmits(['update'])
   const rowCount = ref(props.rowCol.row - 1)
   const colCount = ref(props.rowCol.col - 1)
   onMounted(() => {
       console.log(props.rowCol)
       console.log(rowCount.value, colCount.value)
   })
   const handleMouseOver = (rowIndex, cellIndex) => {
        rowCount.value = rowIndex
        colCount.value = cellIndex
        console.log(rowIndex, cellIndex)
   }
</script>

