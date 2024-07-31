<template>
   <div class="h-full flex mt-2 text-slate-500 bg-white dark:bg-slate-700">
       <div class="gen_l p-2">
         <div class="flex items-center gap-x-2 dark:text-white" >
            <a-switch v-model="tran" checked-value="yes" unchecked-value="no" type="round"/>
            <h3>{{ $t("gen.json.parsing") }}</h3>
         </div>
         <div class="flex items-center gap-x-2 dark:text-white" >
            <a-switch v-model="mini" checked-value="yes" unchecked-value="no" type="round"/>
            <span>{{ $t("gen.json.mini") }}</span>
         </div>
         <div class="flex items-center gap-x-2 dark:text-white" >
            <a-switch v-model="splic" checked-value="yes" unchecked-value="no" type="round"/>
            <span>{{ $t("gen.json.splic") }}</span>
         </div>

         <div class = "w-full flex-col space-y-2 dark:text-white">
            <div>类型</div>
            <a-select v-model="type" class="w-25">
               <a-option value="array" :label="$t('gen.json.type.array')" />
               <a-option value="2D" :label="$t('gen.json.type.2d')" />
               <a-option value="colArray" :label="$t('gen.json.type.column')" />
               <a-option value="keyArray" :label="$t('gen.json.type.keyed')" />
            </a-select>
         </div>
       </div>
       <div class ="w-9/12">
         <a-textarea class="gen_r"  v-model="dataStr"/>
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
         counterStore.setGenText(dataStr.value);
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

<style>
    .arco-switch  {
      @apply dark:bg-slate-500 !important;
    }
</style>