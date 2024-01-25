<template>
   <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-800 bg-white rounded-md flex flex-col gap-6 mb-8">
        <div class="rounded-md flex items-center gap-x-2">
          <div class="w-8 h-8 rounded-full flex justify-center items-center" :style="{'background-color': 'rgb(59 130 246)'}">
                <svg class="icon  text-xl flex text-slate-100" aria-hidden="true">
                <use v-bind:xlink:href="true ? '#icon-CSV' : '#icon-CSV'"></use>
                </svg>
          </div>
          <div class="text-lg font-bold dark:text-slate-200">Data Editor</div>
          <div class="text-blue-400 text-lg" >
            <div @click="updateSelect" class="flex">
                <!--行列动态显示-->
                {{rowCol.row}} x {{rowCol.col}} 
                <!--图标箭头-->
                <div v-if="hiddenSelect" class="ml-2"> <icon-down/></div> 
                <div v-if="!hiddenSelect" class="ml-2"><icon-up /></div>
            </div>
            <div style="position: absolute;" :style="hiddenSelect ? 'display: none;' : ''">
                <RowColSelect :rowCol="rowCol" @update="updateSelectByChild" /> 
            </div>            
          </div>
        </div>
        <div class="flex">
            <DataGrid/>
        </div>
  </div>
</template>

<script setup>
import { IconDown, IconUp } from '@arco-design/web-vue/es/icon';
import DataGrid from './DataGrip.vue'
import RowColSelect from './RowColSelect.vue'
import { onMounted, reactive, ref } from "vue";
const gridConfig = reactive({})
const gridData = ref([])
const hiddenSelect = ref(true)
const rowCol = reactive({
    row: 5,
    col: 3
})

const updateSelect = () => {
    hiddenSelect.value = !hiddenSelect.value
}

const updateSelectByChild = (row, col) => {
    hiddenSelect.value = !hiddenSelect.value
    rowCol.row = row
    rowCol.col = col
}

onMounted(() => {
    console.info(this)
})

</script>