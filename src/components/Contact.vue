<template>
  <div class="bg-white dark:bg-slate-800 p-6 rounded-lg max-container transition-all duration-300">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">{{ $t('contact.title') }}</h1>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4 dark:text-slate-300">{{ $t('contact.ways') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow group">
          <svg class="icon w-8 h-8 mr-3 text-blue-600 dark:text-blue-400 transition-transform" aria-hidden="true">
            <use xlink:href="#icon-email"></use>
          </svg>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('contact.email') }}</p>
            <p class="font-medium dark:text-slate-200 group-hover:text-blue-600">{{ config.contact.email }}</p>
          </div>
        </div>
        <div class="flex items-center p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow group">
          <svg class="icon w-8 h-8 mr-3 text-blue-600 dark:text-blue-400 transition-transform" aria-hidden="true">
            <use xlink:href="#icon-phone"></use>
          </svg>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('contact.phone') }}</p>
            <p class="font-medium dark:text-slate-200 group-hover:text-blue-600">{{ config.contact.phone }}</p>
          </div>
        </div>
        <div class="flex items-center p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow group">
          <svg class="icon w-8 h-8 mr-3 text-blue-600 dark:text-blue-400 transition-transform" aria-hidden="true">
            <use xlink:href="#icon-location"></use>
          </svg>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ $t('contact.address') }}</p>
            <p class="font-medium dark:text-slate-200 group-hover:text-blue-600">{{ config.contact.address }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4 dark:text-slate-300">{{ $t('contact.social') }}</h2>
      <div class="flex space-x-4">
        <a :href="config.social.gitee" class="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors group relative"
           v-tooltip="'Gitee'">
          <svg class="icon w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <use xlink:href="#icon-gitee"></use>
          </svg>
        </a>
        <a :href="config.social.github" class="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors group relative"
           v-tooltip="'GitHub'">
          <svg class="icon w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <use xlink:href="#icon-GitHub"></use>
          </svg>
        </a>
        <a :href="config.social.wechat" class="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors group relative"
           v-tooltip="'WeChat'">
          <svg class="icon w-7 h-7 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
            <use xlink:href="#icon-icon_wechat-circle"></use>
          </svg>
        </a>
      </div>
    </section>

    <!-- 新增二维码区域 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4 dark:text-slate-300">{{ $t('contact.qrcode.title') }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-700 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
          <img src="../qrcode/wechat.jpeg" class="w-32 h-32 mx-auto mb-2" alt="WeChat">
          <p class="font-medium dark:text-slate-200">{{ $t('contact.qrcode.wechat') }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">扫码添加客服</p>
        </div>
        <!-- <div class="bg-white dark:bg-slate-700 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
          <img src="/qrcode/alipay.png" class="w-32 h-32 mx-auto mb-2" alt="Alipay">
          <p class="font-medium dark:text-slate-200">{{ $t('contact.qrcode.alipay') }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">扫码进行赞助</p>
        </div>
        <div class="bg-white dark:bg-slate-700 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
          <img src="/qrcode/qq.png" class="w-32 h-32 mx-auto mb-2" alt="QQ">
          <p class="font-medium dark:text-slate-200">{{ $t('contact.qrcode.qq') }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">扫码加入群聊</p>
        </div>
        <div class="bg-white dark:bg-slate-700 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
          <img src="/qrcode/donate.png" class="w-32 h-32 mx-auto mb-2" alt="Donate">
          <p class="font-medium dark:text-slate-200">{{ $t('contact.qrcode.donate') }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">扫码支持我们</p>
        </div> -->
      </div>
    </section>

    <!-- <section class="animate-fade-in-up">
      <h2 class="text-xl font-semibold mb-4 dark:text-slate-300">{{ $t('contact.formTitle') }}</h2>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-slate-300">{{ $t('contact.name') }}</label>
          <input type="text" class="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-slate-300">{{ $t('contact.email') }}</label>
          <input type="email" class="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-slate-300">{{ $t('contact.message') }}</label>
          <textarea rows="4" class="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"></textarea>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700
          transition-colors shadow-md hover:shadow-lg">
          {{ $t('contact.submit') }}
        </button>
      </form>
    </section> -->
  </div>
</template>

<script setup>
import config from '../config.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.max-container {
  max-width: 1580px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 84vh;
}
</style>