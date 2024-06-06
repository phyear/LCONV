<template>
  <div class="flex w-full">
    <div class="w-3/12 h-64 grid gap-4 grid-cols-3 mr-3">
      <div @click="grip.undo()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-undo"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.undo') }}</div>
      </div>
      <div @click="grip.redo()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-redo"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.redo') }}</div>
      </div>
      <div @click="transpose()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex " aria-hidden="true">
            <use xlink:href="#icon-transpose"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.transpose') }}</div>
      </div>
      <div @click="clean()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex " aria-hidden="true">
            <use xlink:href="#icon-icon_clean"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.clean') }}</div>
      </div>
      <div @click="cleanBlank()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-deduplicate"></use>
          </svg>
        </div>
        <div class="text-xs"> {{ $t('edit.op.deduplicate') }}</div>
      </div>
      <div
        @click="cleanBlank()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-deleterow"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.deleteBlank') }}</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex " aria-hidden="true">
            <use xlink:href="#icon-edit-uppercase"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.uppercase') }}</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-edit-lowercase"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.lowercase') }}</div>
      </div>
      <div
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-t"></use>
          </svg>
        </div>
        <div class="text-xs"> {{ $t('edit.op.capitalize') }}</div>
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
const { row, col, sourceData , getSourceData} = storeToRefs(counterStore)
const dgxlOptions = reactive({
  "data": sourceData.value
});
let grid = new DataGridXL(dgxl.value, dgxlOptions);

onMounted(() => {
  dgxlOptions.data =setData()
          // 重新设置数据
          grid.refresh()
          grid.events.on("insertrows", (e) => {
    var data = grid.getData();
    counterStore.updateSourceData(data)
  });
  grid.events.on("insertcols", (e) => {
    counterStore.updateSourceData(grip.getData())
  });
  grid.events.on("deleterows", (e) => {
    var data = grid.getData();
    counterStore.updateSourceData(data)
  });
  grid.events.on("deletecols", (e) => {
    counterStore.updateSourceData(grid.getData())
  });

  grid.events.on("change", (e) => {
    counterStore.updateSourceData(grid.getData())
  });
});

  

// 用于监听row col变化，更新dgxl的数据
const ww = computed(() => {
   console.log()

  // 绑定表格操作事件 触发行和列的重新计算
  
  return col.value
})



// 翻转
const transpose = () => {
  if (sourceData.value && sourceData.value.length > 0) {

  }
}

const clean = () => {
  if (grid.getData() && grid.getData().length > 0) {
    let data = JSON.parse(JSON.stringify(grid.getData()));
    data.forEach(element => {
      element.forEach(element2 => {
        element2 = ''
      });
    });
    counterStore.updateSourceData(data)
  }
}


const cleanBlank = () => {
  if (grid.getData() && grid.getData().length > 0) {
    let needDeleteRow = {}
    let needDeleteCol = {}
    let data = JSON.parse(JSON.stringify(grid.getData()));


    data.forEach((item, row) => {
      item.forEach((item2, col) => {
        let colOld = 0
        if (col in needDeleteCol) {
            colOld = needDeleteCol[col];
        }

        let rowOld = 0
        if (row in needDeleteRow) {
            rowOld = needDeleteRow[row];
        }
        if (item2 && item2 !== '') {
          needDeleteCol[col] = colOld + 1;
          needDeleteRow[row] = rowOld + 1;
        } else {
          needDeleteCol[col] = colOld + 0;
          needDeleteRow[row] = rowOld + 0;
        }
      })
    })

    


    // 删除空行
    data = data.filter((item, index) => {
      return needDeleteRow[index] != 0 
    })

    // 删除空列
    for (const [key, value] of Object.entries(needDeleteCol)) {
      if(value === 0){
        data.forEach((item, col) => {
          item.splice(key, 1)
        })
      }
    };

    counterStore.updateSourceData(data);
    dgxlOptions.data = data

  }
}

// 删除重复的行 
const deduplicate = () => {
  let data = JSON.parse(JSON.stringify(grip.getData()));
  data = data.filter((item) => {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  })

}


// 重新计算 TableEditor中的数据
const setData = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    return sourceData.value
  } else {
    return DataGridXL.createEmptyData(row.value, col.value);
  }
}

 

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