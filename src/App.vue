<script setup>
import SelectList from './components/DataConv/SelectList.vue'
import Nav from './components/DataConv/Nav.vue'
import RowColSelect from './components/DataConv/RowColSelect.vue'
import GridEditor from './components/DataConv/GridEditor.vue'
import GridSource from './components/DataConv/GridSource.vue'
import DataGen from './components/DataConv/DataGen.vue'
</script>

<template>
  <!--导航条-->
  <Nav/>
  <!--数据来源区域-->
  <GridSource/>
  <!--数据编辑区域-->
   <GridEditor/>
  <!--数据构建区域-->
  <DataGen/>
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


