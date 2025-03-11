<template>
    <div
        class="max-w-screen-2xl m-auto max-container bg-white dark:bg-slate-800 p-6 rounded-lg  transition-all duration-300 flex gap-5">
        <a-affix :offsetTop="20">
            <a-anchor :change-hash="false" line-less="false">
                <a-anchor-link href="#basic">{{ $t('settings.basic') }}</a-anchor-link>
                <a-anchor-link href="#transfer-setting">{{ $t('settings.transfer') }}</a-anchor-link>
            </a-anchor>
        </a-affix>
        <div>
            <div id="basic" class="flex gap-5">
                <div class="flex">
                    <a-button type="primary" @click="$refs.fileInput.click()"
                    class="bg-white text-blue-600 dark:hover:bg-blue-600  dark:hover:text-white border-blue-600 font-medium dark:bg-slate-700">
                    <template #icon>
                        <icon-arrow-rise/>
                    </template>
                    {{ $t("settings.btn.upload") }}
                    </a-button>
                    <input type="file" class="hidden" ref="fileInput" @change="onFileChange" accept=".json">
                </div>
                <div>
                    <a-button
                    class="bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    @click="downloadToFile">
                        <template #icon>
                            <icon-download />
                        </template>
                        {{ $t('settings.btn.download') }}
                    </a-button>
                </div>
            </div>
            <div id="transfer-setting">
                <SettingTransfer />
            </div>
        </div>
    </div>

</template>

<script setup>
import SettingTransfer from './Settings/SettingTransfer.vue'
import { useI18n } from 'vue-i18n'
import { rowColNumberStore } from '../store/RowColNumber'
import { readFileData } from '../util/fileutil'
import { storeToRefs } from 'pinia'

const counterStore = rowColNumberStore()
const { source } = storeToRefs(counterStore)
const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const data = await readFileData(file);
        counterStore.setSource1(JSON.parse(data))
        localStorage.setItem('default-setting', data)
    }
}

const downloadToFile = () => {
  console.log('当前store数据:', JSON.parse(JSON.stringify(source.value)))
  let data = JSON.parse(JSON.stringify(source.value))
  const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'setting.json';
    a.click();
    URL.revokeObjectURL(url);
}
</script>

<style scoped>
.max-container {
    max-width: 1580px;
    margin: 0 auto;
    padding: 0 1rem;
    min-height: 84vh;
}
</style>