<template>
    <div class="wrapper-dgxl">
      <div ref="dgxl" class="grid"></div>
     
    </div>
  </template>
  
  <script>
  import DataGridXL from "@datagridxl/datagridxl2";
  
  export default {
    name: "DataGrid",
    data() {
      return {};
    },
    computed: {
      dgxlOptions() {
        return {
            rowCount: 5,
            colCount:5
        };
      },
    },
    mounted: function () {
      const dgxlObj = new DataGridXL(this.$refs.dgxl, this.dgxlOptions);
      Object.assign(this, { dgxlObj }); // tucks all methods under dgxlObj object in component instance
    },
  };
  </script>
  
  <style>
  .grid {
    height: 500px;
  }
  </style>