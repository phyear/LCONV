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
                {{rowColNumber.row}} x {{rowColNumber.col}} 
                <!--图标箭头-->
                <div v-if="rowColNumber.hidden" class="ml-2"> <icon-down/></div> 
                <div v-if="!rowColNumber.hidden" class="ml-2"><icon-up /></div>
            </div>
            <div style="position: absolute; z-index: 2;" :style="rowColNumber.hidden ? 'display: none;' : ''">
                <RowColSelect/> 
            </div>            
          </div>
        </div>
        <div class="flex">
            <DataGrid />
        </div>
  </div>
</template>

<script setup>
import { IconDown, IconUp } from '@arco-design/web-vue/es/icon';
import DataGrid from './DataGrip.vue'
import RowColSelect from './RowColSelect.vue'
import { rowColNumberStore } from '../../store/RowColNumber'
import { onMounted, reactive, ref } from "vue";


const rowColNumber = rowColNumberStore()

const updateSelect = () => {
    console.log(rowColNumber.hidden)
    rowColNumber.setHidden(!rowColNumber.hidden)
}

</script>