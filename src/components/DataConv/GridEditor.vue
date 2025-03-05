<template>
   <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-800 bg-white rounded-md flex flex-wrap flex-col gap-6 mb-8">
        <div class="rounded-md flex items-center gap-x-2">
          <div class="w-7 h-7 rounded-full flex justify-center items-center" :style="{'background-color': toType.color}">
                <svg class="icon  text-sm flex text-slate-100" aria-hidden="true">
                   <use v-bind:xlink:href="toType.icon"></use>
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
           <DataGrid/>
        </div>
  </div>
</template>

<script setup>
import { IconDown, IconUp } from '@arco-design/web-vue/es/icon';
import DataGrid from './DataGrip.vue'
import RowColSelect from './RowColSelect.vue'
import { rowColNumberStore } from '../../store/RowColNumber'
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from 'pinia'

const rowColNumber = rowColNumberStore()
const { toType } = storeToRefs(rowColNumber)


const updateSelect = () => {
    rowColNumber.setHidden(!rowColNumber.hidden)
}

</script>