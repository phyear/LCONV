import { createI18n } from 'vue-i18n';
import zh_CN from './locales/zh_CN.json';
import en_US from './locales/en_US.json';
import ja_JP from './locales/ja_JP.json'
import ko_KR from './locales/ko_KR.json'

const messages = {
    "zh_CN": zh_CN,
    "en_US": en_US
};

const i18n = createI18n({
    locale: 'zh_CN',
    messages: {
        'zh_CN': zh_CN,
        'en_US': en_US,
        'ja_JP': ja_JP,
        'ko_KR': ko_KR
    }
})

i18n.global.setLocale = (locale) => {
    i18n.locale.value = locale;
};

export default i18n;