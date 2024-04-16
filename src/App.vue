<script setup>
import SelectList from './components/SelectList.vue'
import Nav from './components/Nav.vue'
import RowColSelect from './components/RowColSelect.vue'
import GridEditor from './components/GridEditor.vue'
import GridSource from './components/GridSource.vue'
</script>

<template>
  <!--导航条-->
  <Nav/>
  <!--数据来源区域-->
  <GridSource/>
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


