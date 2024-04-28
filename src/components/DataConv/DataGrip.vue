<template>
  <div class="flex w-full">
    <div class="w-3/12 h-64 grid gap-4 grid-cols-3 mr-3">
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-undo"></use>
          </svg>
        </div>
        <div class="text-xs">Undo</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-redo"></use>
          </svg>
        </div>
        <div class="text-xs">Redo</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex " aria-hidden="true">
            <use xlink:href="#icon-transpose"></use>
          </svg>
        </div>
        <div class="text-xs">Transpose</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex " aria-hidden="true">
            <use xlink:href="#icon-icon_clean"></use>
          </svg>
        </div>
        <div class="text-xs">Clean</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-deduplicate"></use>
          </svg>
        </div>
        <div class="text-xs">deduplicate</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-deleterow"></use>
          </svg>
        </div>
        <div class="text-xs">Delete Blank</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex " aria-hidden="true">
            <use xlink:href="#icon-edit-uppercase"></use>
          </svg>
        </div>
        <div class="text-xs">Uppercase</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-edit-lowercase"></use>
          </svg>
        </div>
        <div class="text-xs">Lowercase</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-t"></use>
          </svg>
        </div>
        <div class="text-xs">Capitalize</div>
      </div>
    </div>
    <div class="w-11/12 h-64" style="overflow: hidden;">
      <div ref="dgxl" class="w-full h-96"></div>
    </div>
    <div style="display: none;">{{ ww }}</div>
  </div>
</template>

<script setup>
import DataGridXL from "@datagridxl/datagridxl2";
import { ref, reactive, onMounted, computed } from "vue";
import { rowColNumberStore } from '../../store/RowColNumber'
import { storeToRefs } from 'pinia'
const counterStore = rowColNumberStore()

const dgxl = ref();
const { row, col, sourceData } = storeToRefs(counterStore)
const dgxlOptions = reactive({
    "data": sourceData.value
});
let grip = new DataGridXL(dgxl.value, dgxlOptions);
// 用于监听row col变化，更新dgxl的数据
const ww = computed(() => {
  dgxlOptions.data = setData(),
  grip = new DataGridXL(dgxl.value, dgxlOptions);

  // 绑定表格操作事件 触发行和列的重新计算
  grip.events.on("insertrows", (e) => {
    var data = grip.getData();
    counterStore.updateSourceData(data)
  });
  grip.events.on("insertcols", (e) => {
    counterStore.updateSourceData(grip.getData())
  });
  grip.events.on("deleterows", (e) => {
    var data = grip.getData();
    counterStore.updateSourceData(data)
  });
  grip.events.on("deletecols", (e) => {
    counterStore.updateSourceData(grip.getData())
  });
  grip.events.on("change", (e) => {
    counterStore.updateSourceData(grip.getData())
  });
  return col.value
})


// 重新计算 TableEditor中的数据
const setData = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    return sourceData.value
  } else {
    return DataGridXL.createEmptyData(row.value, col.value);
  }
}

onMounted(() => {
  
});

 

</script>




<style>
.dgxl-topbar {
  display: none !important;
}

.dgxl-bottombar {
  display: none !important;
}

.dgxl-display {
  inset: unset !important;
}

.dgxl-colHeaderRangeHighlight {
  background-color: bg-slate-100 !important;
}

.dgxl-rowHeaderBackground {}

/* .dgxl-viewport{
    height: 100% !important;
  }

  /* .dgxl-hintForFreezeRows {
    display: none !important;
  } */
</style>