<script setup>
import SelectList from './components/SelectList.vue'
import Nav from './components/Nav.vue'
import RowColSelect from './components/RowColSelect.vue'
import GridEditor from './components/GridEditor.vue'


</script>

<template>
  <!--导航条-->
  <Nav/>
  <!--数据来源区域-->
  <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-200 bg-white rounded-md flex flex-col gap-6 mb-8">
      <div class="rounded-md flex items-center gap-x-2">
        <div class="w-8 h-8 rounded-full flex justify-center items-center" :style="{'background-color': 'rgb(59 130 246)'}">
              <svg class="icon  text-xl flex text-slate-100" aria-hidden="true">
               <use v-bind:xlink:href="true ? '#icon-CSV' : '#icon-CSV'"></use>
              </svg>
        </div>
         <div class="text-lg font-bold">Data Source</div>
         <div class="">
          <a-select :style="{width:'100%'}" placeholder="Please select ..." :bordered="false">
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
            <a-option disabled>Disabled</a-option>
          </a-select>
         </div>
      </div>
      <div class="bg-gray-800 rounded-md flex flex-col h-40">
               
      </div>
  </div>
  <!--数据编辑区域-->
   <GridEditor/>
  <!--数据构建区域-->

  <!--选项卡片区域-->
  <SelectList/>
</template>

<style>
.max-container {
  max-width: 1580px;
  margin-left: auto;
  margin-right: auto;
  padding: .75rem
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

button {
  padding: 0px;
  margin: 0px;
}
</style>


