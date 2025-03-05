<template>
     <!--数据来源区域-->
      <GridSource />
      <!--数据编辑区域-->
      <GridEditor />
      <!--数据构建区域-->
      <DataGen />
      <!--选项卡片区域-->
      <SelectList />
</template>
<script setup>
    import GridEditor from './GridEditor.vue'
    import GridSource from './GridSource.vue'
    import DataGen from './DataGen.vue'
    import SelectList from './SelectList.vue'
</script>
