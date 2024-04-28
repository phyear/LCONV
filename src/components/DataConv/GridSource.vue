<template>
    <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-800 bg-white rounded-md flex flex-col gap-6 mb-8">
      <div class="rounded-md flex items-center gap-x-2">
        <div class="w-8 h-8 rounded-full flex justify-center items-center" :style="{'background-color': 'rgb(59 130 246)'}">
              <svg class="icon  text-xl flex text-slate-100" aria-hidden="true">
               <use v-bind:xlink:href="true ? '#icon-CSV' : '#icon-CSV'"></use>
              </svg>
        </div>
         <div class="text-lg font-bold dark:text-white">Data Source</div>
         <div class="">
          <a-select :style="{width:'100%'}" class="text-xl text-blue-600 "
          :bordered="false" 
          v-model="getPreCode"
           @change="onChange">
            <a-option v-for="(item,index) in data" :key="index" :value="item.code" class="text-md">{{item.name}}</a-option>
          </a-select>
         </div>
         <div>
              <a-button type="primary" shape="round" @click="$refs.fileInput.click()" class="bg-white text-blue-600 border-blue-600">
                加载文件
              </a-button>
              <input type="file" class="hidden" ref="fileInput" @change="onFileChange" :accept="getPreType?.accept"> 
            </div>
            <div>
              <a-button type="primary" shape="round" @click="">
                加载用例
              </a-button>
            </div>
      </div>
      <div class="w-full text-white font-bold">
        <a-textarea v-model="sourceText" class="bg-gray-800 dark:bg-slate-700 rounded-md flex flex-col h-40 text-white text-lg" :placeholder="`粘贴${getPreType?.name}数据或者上传${getPreType?.name}文件`" auto-size/>    
      </div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed} from 'vue'
  import {source} from '../../util/source'
  import {readExcel} from '../../util/fileutil'
  import { rowColNumberStore } from '../../store/RowColNumber'
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia'

  const rowColNumber = rowColNumberStore()


  const data = reactive([]);

  
  const {getPreType, getPreCode} = storeToRefs(rowColNumber)

    
  const sourceText = computed(() => rowColNumber.sourceText);


  onMounted(() => {
    data.push(...source)
    // 初始化 转换对象的默认值以及可转换列表
    rowColNumber.setTypeInfo(source[0], null)
  })

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const excelData = await readExcel(file);
    rowColNumber.setSourceData(excelData.sourceData);
    rowColNumber.setSourceText(excelData.sourceText);
  }

  const onChange = (value) => {
    const preData = data.find(item => item.code === value)
    rowColNumber.setTypeInfo(preData)
  }

</script>