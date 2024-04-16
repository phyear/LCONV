<template>
    <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-200 bg-white rounded-md flex flex-col gap-6 mb-8">
      <div class="rounded-md flex items-center gap-x-2">
        <div class="w-8 h-8 rounded-full flex justify-center items-center" :style="{'background-color': 'rgb(59 130 246)'}">
              <svg class="icon  text-xl flex text-slate-100" aria-hidden="true">
               <use v-bind:xlink:href="true ? '#icon-CSV' : '#icon-CSV'"></use>
              </svg>
        </div>
         <div class="text-lg font-bold">Data Source</div>
         <div class="">
          <a-select :style="{width:'100%'}" class="text-xl text-blue-600 "
          :bordered="false" 
          :default-value="selectDefault" @change="onChange">
            <a-option v-for="(item,index) in data" :key="index" :value="item.code" class="text-md">{{item.name}}</a-option>
          </a-select>
         </div>
         <div>
              <a-button type="primary" shape="round" @click="$refs.fileInput.click()" class="bg-white text-blue-600 border-blue-600">
                加载文件
              </a-button>
              <input type="file" class="hidden" ref="fileInput" @change="onFileChange" :accept="pre.preType?.accept"> 
            </div>
            <div>
              <a-button type="primary" shape="round" @click="">
                加载用例
              </a-button>
            </div>
      </div>
      <div class="w-full text-white font-bold">
        <a-textarea v-model="sourceText" class="bg-gray-800 rounded-md flex flex-col h-40 text-white text-lg" :placeholder="`粘贴${pre.preType?.name}数据或者上传${pre.preType?.name}文件`" auto-size/>    
      </div>
  </div>
</template>

<script setup>
  import { ref, reactive} from 'vue'
  import {source} from '../util/source'
  import {readExcel} from '../util/fileutil'
  import { rowColNumberStore } from '../store/RowColNumber'
  import { onMounted } from 'vue';

  const rowColNumber = rowColNumberStore()

  const data = reactive([]);
  const pre = reactive({
     preType: rowColNumber.preType
  });
  const selectDefault = ref('excel')
  const sourceText = ref(rowColNumber.sourceText)
  const sourceData = ref(rowColNumber.sourceData)
  
  onMounted(() => {
    console.log('aa==', sourceText.value)
    data.push(...source)
    if(!pre.preType){
      pre.preType = source[0]
      selectDefault.value = source[0].code
    } 
  })

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const excelData = await readExcel(file);
    rowColNumber.setSourceData(excelData.sourceData);
    rowColNumber.setSourceText(excelData.sourceText);
    sourceText.value = excelData.sourceText;
  }

  const onChange = (value) => {
    const preData = data.find(item => item.code === value)
    pre.preType = preData
    console.log(pre)
  }

</script>