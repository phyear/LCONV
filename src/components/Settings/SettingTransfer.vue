<template>
        <div class="flex flex-col px-4">
            <h1 class="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{{ $t('settings.transfer') }}</h1>
            <a-scrollbar class="w-full overflow-x-auto">
            <div class="space-y-4">
                <!-- 表头 -->
                <div
                    class="rounded-lg border border-transparent bg-white shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md dark:bg-slate-800 dark:hover:border-slate-600">
                    <table class="">
                        <thead
                            class="border-b border-slate-100 dark:border-slate-600 bg-white dark:bg-slate-800 sticky top-0 z-10">
                            <tr class="group">
                                <th v-for="(headerItem, index) in tableHead" :key="index"
                                    class="min-w-[60px] px-3 py-2 text-center text-sm font-medium text-slate-700 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-800">
                                    {{ headerItem.name }}
                                </th>
                                <th class="min-w-[60px] bg-white dark:bg-slate-800 sticky right-0 z-20  before:absolute before:left-[-30px] before:w-[30px] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1))] dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1))] px-3 py-2 text-sm">设置</th>
                            </tr>
                        </thead>

                        <!-- 配置项 -->
                        <tbody>
                            <tr v-for="(row, rowIndex) in tableBody" :key="rowIndex"
                                class="transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 relative">
                                <td v-for="(cell, cellIndex) in row" :key="cellIndex"
                                    class="px-3 py-2 text-sm text-center bg-white dark:bg-slate-800"
                                     >
                                    <div v-if="cell.head"
                                        class="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {{ cell.name }}
                                    </div>
                                    <a-checkbox v-if="'active' in cell" :model-value="cell.active" class="mx-auto"
                                        @change="changeData(cell.rowCode, cell.colCode, cell.code,  $event)" />
                                </td>
                                <td
                                    class="px-3 py-2 text-sm text-center bg-white dark:bg-slate-800 sticky right-0 z-20 before:absolute before:left-[-30px] before:w-[30px] before:h-full before:bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1))] dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1))]">
                                    <a class="mx-auto" @click="editDataTypeSetting(row[0].code, $event)">
                                        <icon-edit  /> 
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </a-scrollbar>
            <a-modal v-model:visible="visible" title="Data Setting Form" @before-ok="handleBeforeOk">
                <a-form :model="currentDataType">
                <a-form-item field="name" label="Name">
                    <a-input v-model="currentDataType.name" />
                </a-form-item>
                <a-form-item field="code" label="Code">
                    <a-input v-model="currentDataType.code" />
                </a-form-item>
                <a-form-item field="color" label="Color">
                    <a-color-picker  size="medium" showText disabledAlpha v-model="currentDataType.color"/>
                </a-form-item>
                <a-form-item field="icon" label="Icon">
                    <a-input v-model="currentDataType.icon" />
                </a-form-item>
                <a-form-item field="download" label="Download">
                    <a-switch v-model="currentDataType.download">
                        <template #checked-icon>
                            <icon-check/>
                        </template>
                        <template #unchecked-icon>
                            <icon-close/>
                        </template>
                    </a-switch>
                </a-form-item>
                <a-form-item field="copy" label="Copy">
                    <a-switch v-model="currentDataType.copy">
                        <template #checked-icon>
                            <icon-check/>
                        </template>
                        <template #unchecked-icon>
                            <icon-close/>
                        </template>
                    </a-switch>
                </a-form-item>
                </a-form>
            </a-modal>
        </div>
        <div> {{ cc }}
             {{ daa }}
        </div>
</template>

<script setup>

import { reactive, onMounted, ref, watch, nextTick } from 'vue'
import { rowColNumberStore } from '../../store/RowColNumber'
import { storeToRefs } from 'pinia'

const tableHead = ref([])

const tableBody = ref([])

const visible = ref(false);




let currentDataType = reactive({})

const counterStore = rowColNumberStore()

let { code_type } = storeToRefs(counterStore)

onMounted(() => {
    let data = buildData(code_type.value);
    // 使用与watch监听器一致的响应式赋值方式
    tableHead.value = [...data[0]];
    tableBody.value = data.slice(1).map(arr => [...arr]);
})

watch(() => code_type.value, (newCodeType) => {
    let data = buildData(newCodeType);
    // 使用数组解构确保响应式更新
    tableHead.value = [...data[0]];
    tableBody.value = data.slice(1).map(arr => [...arr]);
    
}, { deep: true });

const handleBeforeOk = () => {
  counterStore.code_type[currentDataType.code] = currentDataType;
  localStorage.setItem('default-setting', JSON.stringify(buildSettingJSON(code_type.value)));
  let data = buildData(code_type.value);
  tableHead.value = data[0];
  tableBody.value = data.slice(1);
  nextTick(() => {
    visible.value = false;
  });
}


const buildSettingJSON = (codeType) => {
    let result = []
    Object.entries(codeType).forEach(([type, data]) => {

        let canTran = []
        Object.entries(data.canTranMap).forEach(([type1, data1]) => {
            canTran.push(data1)
        })
        data['canTran'] = canTran
        result.push(data)
    });
    return result
}

const editDataTypeSetting = (code, event) => {
    event.stopPropagation();
    Object.assign(currentDataType, code_type.value[code]);
    visible.value = true;
}

const buildData = (codeType) => {
    // 构建展示头 
    let head = [{ "name": "" }]
    let bodys = []

    Object.entries(codeType).forEach(([type, data]) => {
        let body = []
        head.push({
            "name": data.name,
            "code": data.code,
            "head": true
        })
        body.push({
            "name": data.name,
            "rowCode": data.code,
            "colCode": data.code,
            "code": data.code,
            "head": true
        })
        let canTranMap = data.canTranMap
        Object.entries(codeType).forEach(([type2, data2]) => {
            let canTran = type2 in canTranMap
            body.push({
                "name": data2.name,
                "rowCode": data.code,
                "colCode": data2.code,
                "code": data.code + '-' + data2.code,
                "active": canTran
            })
        })
        bodys.push(body)
    })

    return [head, ...bodys]

}


const changeData = (rowCode, colCode, code, active) => {
    tableBody.value = tableBody.value.map(item => {
        item.map(item2 => {
            if (item2.code === code) {
                item2.active = active
            }
            return item2
        })
        return item
    })
    // 将当前数据存入缓存 进行个性化设置
    if(active){
        let canTran = {
            "code": colCode,
            "name": counterStore.code_type[rowCode].name + " TO " + counterStore.code_type[colCode].name, 
            "description":""
         }
         counterStore.code_type[rowCode].canTranMap[colCode] = canTran
    } else {
        delete counterStore.code_type[rowCode].canTranMap[colCode]
    }
    let source = buildSettingJSON(counterStore.code_type);
    counterStore.setSource(counterStore.code_type, source);
    localStorage.setItem('default-setting', JSON.stringify(source))
}
</script>