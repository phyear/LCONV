<template>
   <div class="h-full flex mt-2 text-slate-500">
       <div class="flex-col space-y-2 border-r-2 pr-2 w-3/12">
         <div class="flex items-center gap-x-2" >
            <a-switch v-model="tran" checked-value="yes" unchecked-value="no" type="round"/>
            <h3>解析JSON</h3>
         </div>
         <div class="flex items-center gap-x-2" >
            <a-switch v-model="mini" checked-value="yes" unchecked-value="no" type="round"/>
            <span>压缩JSON</span>
         </div>
         <div class="flex items-center gap-x-2" >
            <a-switch v-model="splic" checked-value="yes" unchecked-value="no" type="round"/>
            <span>拼接前缀'data'</span>
         </div>

         <div class = "w-full flex-col space-y-2">
            <div>类型</div>
            <a-select v-model="type" class="w-25">
               <a-option value="array" label="数组对象" />
               <a-option value="2D" label="2D对象" />
               <a-option value="colArray" label="列数组" />
               <a-option value="keyArray" label="主键数组" />
            </a-select>
         </div>
       </div>
       <div class ="w-9/12">
         <a-textarea class="h-60 border-none bg-white" v-model="dataStr"/>
       </div>
       <div style="display: none;">{{ ww }}</div>
   </div>
</template>

<script setup> 
     import { ref, computed, onMounted } from 'vue'
     import { rowColNumberStore } from '../../../store/RowColNumber'
     import { storeToRefs } from 'pinia'
     const counterStore = rowColNumberStore()  

     const { data } = storeToRefs(counterStore)
     const tran = ref('no') 
     const mini = ref('no')
     const splic = ref('no')
     const type = ref('array')
     const dataStr = ref('')

     const ww = computed(() => {
         const datas = data.value
         let res = tranData(type.value, tran.value, datas);
         if('yes' == splic.value){
            res = {'data': res}
         }
         // 将二维数组转换成字符串
         if ('yes' == mini.value) {
            dataStr.value = JSON.stringify(res)
         } else {
            dataStr.value = JSON.stringify(res, null, 2)
         }
         
     })

     const tranData = (type, tran, datas) => {
          let res = []
          // 将二维数组转成对象数组
          if ('array' == type) {
            const keys = datas[0];
            datas.forEach((element, index) => {
               if(index > 0) {
                  const obj = {};
                  element.forEach((item, i) => {
                     obj[keys[i]] = item
                  })
                  res.push(obj)
               }
            });
         } else if ('colArray' == type) {
            // 将二维数组转成列数组
            const keys = datas[0];
            keys.forEach((key, index) => {
               const values = [];
               datas.forEach((element, i) => {
                  if(i > 0) {
                     values.push(element[index])
                  }
               });
               const arr = {};
               arr[key] = values
               res.push(arr)
            });
         } else if ('keyArray' == type) {
            // 将二维数组转成主键数组
            const map = {}
            datas.forEach((element, index) => {
               map[index] = element;
            });
            res.push(map)
        } else {
           res = datas
        }
        return res
     }
</script>