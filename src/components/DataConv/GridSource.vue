<template>
  <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-800 bg-white rounded-md flex flex-col gap-6 mb-8">
    <div class="rounded-md flex items-center gap-x-2">
      <div class="w-7 h-7 rounded-full flex justify-center items-center"
        :style="{ 'background-color': getPreType.color ? getPreType.color : 'rgb(59 130 246)' }">
        <svg class="icon  text-sm flex text-slate-100" aria-hidden="true">
          <use v-bind:xlink:href="getPreType.icon"></use>
        </svg>
      </div>
      <div class="text-lg font-bold dark:text-white">Data Source</div>
      <div class="">
        <a-space direction="vertical" size="large">
          <a-select :style="{ width: '100px' }" class="text-xl text-blue-600 " :bordered="false" v-model="getPreCode"
            size='medium' @change="onChange">
            <a-option v-for="(item, index) in data" :key="index" :value="item.code" class="text-md">{{ item.name
              }}</a-option>
          </a-select>
        </a-space>
      </div>
      <!--对上传文件时 excel和csv支持多sheet页显示---->
      <div class="" v-if="sheetNames.length > 0">
        <a-space size="mini">
          <span><a-divider direction="vertical" />Sheet</span>
          <a-select :style="{ width: '100px' }" class="text-xl text-blue-600 " :bordered="false" v-model="activeSheet"
            size='medium' @change="onSheetChange">
            <a-option v-for="(item, index) in sheetNames" :key="index" :value="item" class="text-md">{{ item
              }}</a-option>
          </a-select>
        </a-space>
      </div>

      <div>
        <a-button type="primary" shape="round" @click="$refs.fileInput.click()"
          class="bg-white text-blue-600 dark:hover:bg-blue-600  dark:hover:text-white border-blue-600 font-medium dark:bg-slate-700">
          {{ $t("source.btn.loading") }}
        </a-button>
        <input type="file" class="hidden" ref="fileInput" @change="onFileChange" :accept="getPreType?.accept">
      </div>
      <div>
        <a-button type="primary" shape="round" @click="setExample"
          class="bg-white text-blue-600 border-blue-600  dark:hover:bg-blue-600 dark:hover:text-white font-medium dark:bg-slate-700">
          {{ $t("source.btn.other") }}
        </a-button>
      </div>
    </div>
    <div class="w-full text-white font-bold">
      <a-textarea v-model="sourceText" @change="textChange"
        class="bg-gray-800 dark:bg-slate-700 rounded-md flex flex-col h-40 text-white text-lg"
        :placeholder="`粘贴${getPreType?.name}数据或者上传${getPreType?.name}文件`"/>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { source } from '../../util/source'
import { readExcel } from '../../util/fileutil'
import { rowColNumberStore } from '../../store/RowColNumber'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { TransferContext, dataHandle } from '../../context/TransferContext'
import { Notification } from '@arco-design/web-vue';

const rowColNumber = rowColNumberStore()


const data = reactive([]);

let sheetNames = reactive([])

let activeSheet = ref(null)

let sheetDataMap = reactive({})



const { getPreType, getPreCode, sourceText } = storeToRefs(rowColNumber)


onMounted(() => {
  data.push(...source)
  // 初始化 转换对象的默认值以及可转换列表
  rowColNumber.setTypeInfo(source[0], null)
})

// 当切换sheet页时

const onSheetChange = (value) => {
  console.log(sheetDataMap)
  let excelData = sheetDataMap[value]
  rowColNumber.setSourceData(excelData.sourceData);
  rowColNumber.data = excelData.sourceData;
  rowColNumber.setSourceText(excelData.sourceText);
  rowColNumber.setHistoryData(excelData.sourceData)
}

// 文件上传时处理
const onFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const excelData = await readExcel(file, getPreCode.value);
    if (excelData.sheetNames != null) {
      sheetNames = excelData.sheetNames
      activeSheet.value = excelData.sheetNames[0]
      sheetDataMap = excelData.sheetDataMap
    }
    if ('error' in excelData) {
      Notification.error({
        title: excelData.error,
        style: {}
      })
    } else {
      if (!excelData.sourceData || excelData.sourceData.length === 0) {
        Notification.error({
          title: '数据为空',
          style: {}
        })
      } else {
        rowColNumber.setSourceData(excelData.sourceData);
        rowColNumber.data = excelData.sourceData;
        rowColNumber.setSourceText(excelData.sourceText);
        rowColNumber.setHistoryData(excelData.sourceData)
      }
    }
  }
}

const onChange = (value) => {
  const preData = data.find(item => item.code === value)
  rowColNumber.setTypeInfo(preData)
}

const textChange = (value) => {
  const excelData = TransferContext('SOURCE', getPreCode.value, value)
  if ('error' in excelData) {
    Notification.error({
      title: excelData.error,
      style: {}
    })
  } else {
    rowColNumber.sourceData = excelData.sourceData;
    rowColNumber.data = excelData.sourceData;
    rowColNumber.sourceText = excelData.sourceText;
    rowColNumber.setHistoryData(excelData.sourceData)
  }
}

const setExample = () => {
  const example = [
    ["name", "age", "sex"],
    ["zhang", "17", "man"],
    ["chen", "22", "woman"],
    ["li", "38", "man"],
    ["wang", "21", "woman"],
  ]
  const config = {
    op: '',
    type: ''
  }
  let exampleStr = dataHandle[getPreCode.value].toGenData(example, config)
  let datas = dataHandle[getPreCode.value].to2DArray(exampleStr)
  if ('error' in datas) {
    Notification.error({
      title: excelData.error,
      style: {}
    })
  } else {
    rowColNumber.setSourceData(datas.sourceData);
    rowColNumber.data = datas.sourceData;
    rowColNumber.setSourceText(datas.sourceText);
    rowColNumber.setHistoryData(datas.sourceData)
  }
}

</script>