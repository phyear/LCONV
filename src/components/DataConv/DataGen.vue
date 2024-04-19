<template>
    <div class="max-w-screen-2xl m-auto p-6 dark:bg-slate-200 bg-white rounded-md flex flex-col gap-6 mb-8">
        <div class="rounded-md flex items-center gap-x-2 justify-between">
            <div class="flex items-center gap-x-2">
                <div class="w-8 h-8 rounded-full flex justify-center items-center"
                    :style="{ 'background-color': 'rgb(59 130 246)' }">
                    <svg class="icon  text-xl flex text-slate-100" aria-hidden="true">
                        <use v-bind:xlink:href="true ? '#icon-CSV' : '#icon-CSV'"></use>
                    </svg>
                </div>
                <div class="text-lg font-bold">Data Gen </div>
            </div>
            <div class="flex gap-2">
                <a-button 
                    class="bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                    Copy
                </a-button>
                <a-button class="bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                    Download
                </a-button>
            </div>
        </div>
        <div>
            <div class="w-full text-white font-bold">
                <div class="p-2 bg-slate-100 flex items-center justify-start gap-x-4">
                    <a-button type="primary">JSON</a-button>
                    <a-button>CSV</a-button>
                </div>
            </div>

            <div class="w-full  h-60">
                <GenType/>
            </div>
        </div>

    </div>
</template>

<script setup>
    import GenType from '../DataConv/GenType/GenType.vue'
</script>
