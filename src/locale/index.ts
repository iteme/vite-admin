// 提示信息仅在开发环境生效
import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';
import { useAppStore } from '@/store/modules/app';

const files = import.meta.globEager('./modules/*.ts');

const messages: LocaleMessages<VueMessageType> = {};
Object.keys(files).forEach((c: string) => {
  const module = files[c].default;
  const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2');
  messages[moduleName] = module;
});

// 初次进入，采用浏览器当前设置的语言，默认采用中文
const lang = useAppStore().getLang || navigator.language;
const locale = lang.indexOf('en') !== -1 ? 'en' : 'zh-cn';

const i18n = createI18n({
  locale: locale,
  fallbackLocale: 'zh-cn',
  messages,
});

document.querySelector('html')?.setAttribute('lang', locale);

export default i18n;
