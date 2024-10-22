<template>
  <div class="flex w-full">
    <div class="w-3/12 h-64 grid gap-4 grid-cols-3 mr-3">
      <div @click="undo()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-undo"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.undo') }}</div>
      </div>
      <div @click="redo()"
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
      <div @click="deduplicate()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-deduplicate"></use>
          </svg>
        </div>
        <div class="text-xs"> {{ $t('edit.op.deduplicate') }}</div>
      </div>
      <div @click="cleanBlank()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-deleterow"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.deleteBlank') }}</div>
      </div>
      <div
        @click="uppercase()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex " aria-hidden="true">
            <use xlink:href="#icon-edit-uppercase"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.uppercase') }}</div>
      </div>
      <div
        @click="lowercase()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-edit-lowercase"></use>
          </svg>
        </div>
        <div class="text-xs">{{ $t('edit.op.lowercase') }}</div>
      </div>
      <div
        @click="firstUpper()"
        class="w-full h-full rounded-l-lg border-blue-500 border rounded-b-lg flex flex-col justify-center items-center gap-2 text-blue-500 hover:bg-blue-100  dark:hover:bg-slate-900 dark:hover:text-white">
        <div class="">
          <svg class="icon  text-xl flex" aria-hidden="true">
            <use xlink:href="#icon-t"></use>
          </svg>
        </div>
        <div class="text-xs"> {{ $t('edit.op.capitalize') }}</div>
      </div>
    </div>
    <div class="w-11/12 h-100 p-2" style="overflow: hidden; z-index: 0;">
       <DataArea/>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { rowColNumberStore } from '../../store/RowColNumber'
import { localeStore } from '../../store/Locale.js'
import { storeToRefs } from 'pinia'
import DataArea from './DataArea.vue'




const counterStore = rowColNumberStore()

const localeStoreS = localeStore()

const { row, col, sourceData, getSourceData } = storeToRefs(counterStore)


// 撤销

const undo = () => {
  let length = counterStore.historyData.length
  if (length > 0) {
    if ((counterStore.currentIndex - 1 >= 0)) {
      let index = counterStore.currentIndex - 1
      let data = counterStore.historyData
      counterStore.updateSourceData(JSON.parse(data[index]))
      counterStore.currentIndex = index
    }
  }
}

// 重做
const redo = () => {
  let length = counterStore.historyData.length
  if ((counterStore.currentIndex + 1) < length) {
    let index = counterStore.currentIndex + 1
    let data = counterStore.historyData
    counterStore.updateSourceData(JSON.parse(data[index]))
   
  }

}

// 翻转
const transpose = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    let matrix = JSON.parse(JSON.stringify(sourceData.value));
    // 获取原数组的行数（即新数组的列数）
    const rowCount = matrix.length;
    // 获取原数组的列数（即新数组的行数），假设所有行的长度相同
    const colCount = matrix[0].length;

    // 创建一个新的二维数组用于存放转置后的结果
    const transposedMatrix = new Array(colCount);
    for (let i = 0; i < colCount; i++) {
        transposedMatrix[i] = new Array(rowCount);
    }

    // 遍历原数组，进行行列对调
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
          transposedMatrix[j][i] = matrix[i][j];
      }
    }

    counterStore.updateSourceData(transposedMatrix)
    counterStore.setHistoryData(transposedMatrix)

  
  }
}
  
// 清空
const clean = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    let data = JSON.parse(JSON.stringify(sourceData.value));
    data = data.map(row => {
       // 再次使用map函数遍历内层数组（即每一行）
        return row.map(element => {
        // 将每个元素替换为 ''
        return '';
      });
    });

    counterStore.updateSourceData(data)
    counterStore.setHistoryData(data)
  }
}

// 清空空格
const cleanBlank = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    let needDeleteRow = {}
    let needDeleteCol = {}
    let data = JSON.parse(JSON.stringify(sourceData.value));


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
      if (value === 0) {
        data.forEach((item, col) => {
          item.splice(key, 1)
        })
      }
    };

    counterStore.updateSourceData(data)
    counterStore.setHistoryData(data)

  }
}

// 删除重复的行 
const deduplicate = () => {
  let data = JSON.parse(JSON.stringify(sourceData.value));
  data = data.filter((item) => {
    return data.hasOwnProperty(item) ? false : (data[item] = true);
  })

  counterStore.updateSourceData(data)
  counterStore.setHistoryData(data)

}

// 转大写 
const uppercase = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    let str = JSON.stringify(sourceData.value)
    let data = JSON.parse(str.toUpperCase());
    counterStore.updateSourceData(data)
    counterStore.setHistoryData(data)
  }
}

// 转大写 
const lowercase = () => {
  if (sourceData.value && sourceData.value.length > 0) {
    let str = JSON.stringify(sourceData.value)
    let data = JSON.parse(str.toLowerCase());
    counterStore.updateSourceData(data)
    counterStore.setHistoryData(data)
  }
}

// 第一个字母转大写
const firstUpper = () => {
  if (sourceData.value && sourceData.value.length > 0) {
  let matrix = JSON.parse(JSON.stringify(sourceData.value));
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (typeof cell === 'string') {
        // 检查字符是否为字母
        if (/[a-zA-Z]/.test(cell)) {
          // 使用charAt(0)获取第一个字符并将其转换为大写
          const firstChar = cell.charAt(0).toUpperCase();
          // 使用substring(1)获取剩余的字符
          const restOfWord = cell.substring(1);
          // 合并第一个字符和剩余字符，形成新的字符串
          row[j] = firstChar + restOfWord;
        }
      }
    }
  }
    counterStore.updateSourceData(matrix)
    counterStore.setHistoryData(matrix) 
  }
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

.arco-select-view-single {
  @apply dark:bg-slate-500  dark:text-white !important;
}

.arco-select-dropdown-list {
  @apply dark:bg-slate-500 !important;
}

/* .dgxl-viewport{
    height: 100% !important;
  }

  /* .dgxl-hintForFreezeRows {
    display: none !important;
  } */
</style>