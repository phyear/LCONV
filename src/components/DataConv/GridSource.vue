<template>
  <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-800 bg-white rounded-md flex flex-col gap-6 mb-8">
    <div class="rounded-md flex flex-wrap items-center gap-x-2">
        <div class="flex gap-x-2"> 
          <div class="w-7 h-7 rounded-full flex justify-center items-center"
          :style="{ 'background-color': getPreType.color ? getPreType.color : 'rgb(59 130 246)' }">
          <svg class="icon  text-sm flex text-slate-100" aria-hidden="true">
            <use v-bind:xlink:href="getPreType.icon"></use>
          </svg>
        </div>
        <div class="text-lg font-bold dark:text-white">Data Source</div>
      </div>
      <div class="flex">
        <a-space direction="vertical" size="large">
          <a-select :style="{ width: '100px' }" class="text-xl text-blue-600 " :bordered="false" v-model="getPreCode"
            size='medium' @change="onChange">
            <a-option v-for="(item, index) in data" :key="index" :value="item.code" class="text-md">{{ item.name
              }}</a-option>
          </a-select>
        </a-space>
      </div>
      <!--对上传文件时 excel和csv支持多sheet页显示---->
      <div class="flex" v-if="sheetNames.length > 0">
        <a-space size="mini">
          <span><a-divider direction="vertical" />Sheet</span>
          <a-select :style="{ width: '100px' }" class="text-xl text-blue-600 " :bordered="false" v-model="activeSheet"
            size='medium' @change="onSheetChange">
            <a-option v-for="(item, index) in sheetNames" :key="index" :value="item" class="text-md">{{ item
              }}</a-option>
          </a-select>
        </a-space>
      </div>

      <div class="flex">
        <a-button type="primary" shape="round" @click="$refs.fileInput.click()"
          class="bg-white text-blue-600 dark:hover:bg-blue-600  dark:hover:text-white border-blue-600 font-medium dark:bg-slate-700">
          {{ $t("source.btn.loading") }}
        </a-button>
        <input type="file" class="hidden" ref="fileInput" @change="onFileChange" :accept="getPreType?.accept">
      </div>

      <div class="flex">
        <a-button type="primary" shape="round" @click="setExample"
          class="bg-white text-blue-600 border-blue-600  dark:hover:bg-blue-600 dark:hover:text-white font-medium dark:bg-slate-700">
          {{ $t("source.btn.other") }}
        </a-button>
      </div>
      <div class="flex">
        <a-popover position="bottom">
          <a-button type="primary" shape="round" @click=""
            class="bg-white text-blue-600 border-blue-600  dark:hover:bg-blue-600 dark:hover:text-white font-medium dark:bg-slate-700">
            {{ $t("source.btn.remote") }}
          </a-button>
          <template #content>
            <div class="flex gap-4">
              <a-input-search type="primary" shape="round" @search="remoteFile"
                class="bg-white text-blue-600 border-blue-600  dark:hover:bg-blue-600 dark:hover:text-white font-medium dark:bg-slate-700"
                search-button>
                <template #button-icon>
                  <icon-link />
                </template>
              </a-input-search>
            </div>
           </template>
        </a-popover>
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
import { readExcel } from '../../util/fileutil'
import { rowColNumberStore } from '../../store/RowColNumber'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { TransferContext, dataHandle } from '../../context/TransferContext'
import { Notification } from '@arco-design/web-vue';
import axios from 'axios';

const rowColNumber = rowColNumberStore()


const data = reactive([]);

let sheetNames = reactive([])

let activeSheet = ref(null)

let sheetDataMap = reactive({})



const { getPreType, getPreCode, sourceText , getSource} = storeToRefs(rowColNumber)


onMounted(() => {
  data.push(...getSource.value)
  // 初始化 转换对象的默认值以及可转换列表
  rowColNumber.setTypeInfo(getSource.value[0], null)
})

const remoteFile = async (url) => {
    console.log('remoteFile', url)
    const fileName = url.substring(url.lastIndexOf('/') + 1)
    const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
    // 校验文件类型
    let successed = checkFileType(fileType)
    if (successed) {
      // 根据远程地址获取文件内容
      const response = await axios.get(url, {responseType: 'blob'})
      if (response.status === 200) {
          const file = new File([response.data], fileName, {
            type: response.data.type
          });
          await handleFile(file)
      }
    } else {
      Notification.error({
          title: '文件格式不匹配',
          style: {}
        })
    }
  }

  const checkFileType = (fileType) => {
    let type = getPreType.value.accept
    return type.includes(fileType)
  }
// 当切换sheet页时
const onSheetChange = (value) => {
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
    await handleFile(file)
  }
}

const handleFile = async (file) => {
  const excelData =  await readExcel(file, getPreCode.value);
    if (excelData.sheetNames != null) {
      sheetNames = excelData.sheetNames
      activeSheet.value = excelData.sheetNames[0]
      sheetDataMap = excelData.sheetDataMap
    }
    if ('error' in excelData) {
      let excelData = {};
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

const onChange = (value) => {
  const preData = data.find(item => item.code === value)
  console.log('preCode=', preData)
  rowColNumber.setTypeInfo(preData)
  sheetNames = []
  sheetDataMap = {}
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
      title: datas.error,
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