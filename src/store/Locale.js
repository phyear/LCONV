import { defineStore } from 'pinia'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import ja from '@arco-design/web-vue/es/locale/lang/ja-jp';

const dark = () => {
    let dark = localStorage.getItem('lconv.dark')
    if (dark) {
       return dark;
    }
    // 根据当前时间判断是白天模式还是黑夜模式
    let hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        dark = 'light';
    } else {
        dark = 'dark';
    }
    return dark;
}

export const localeStore = defineStore('locale', {
    state: () => {
        return {
            locale: localStorage.getItem('lconv.locale') || 'zh-CN',
            dark: dark()
        }
    },
    getters: {
        getLocale: (state) => {
            const localeMap = {
                "zh_CN": zhCN,
                "en_US": enUS,
                "ja": ja
            }
            return localeMap[state.locale]
        },
        getDark: (state) => {
            return state.dark
        },
    },
    actions: {
        setLocale(locale) {
            this.locale = locale
            localStorage.setItem('lconv.locale', locale)
        },
        setDark(dark) {
            this.dark = dark
            localStorage.setItem('lconv.dark', dark)
        }
    }
})