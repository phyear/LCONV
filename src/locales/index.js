import { createI18n } from 'vue-i18n';
import zh_CN from './zh_CN.json';
import en_US from './en_US.json';

const messages = {
    "zh_CN": zh_CN,
    "en_US": en_US
};

const i18n = createI18n({
    locale: 'zh_CN', // set default locale
    messages, // set locale messages
});

i18n.global.setLocale = (locale) => {
    i18n.locale.value = locale;
};

export default i18n;