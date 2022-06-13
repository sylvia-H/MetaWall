import { createApp } from 'vue';
// TailwindCSS
import './styles/all.scss';
// purge-icons
import '@purge-icons/generated';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 自定義 methods
import { transferToDate, transferSinceThen } from './methods/filters';
// vee-validate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// 載入 router & APP
import router from './router';
import App from './App.vue';

// vee-validate：加入全部規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
defineRule('alpha_num_mix', value => {
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
    return '密碼需至少 8 碼以上，並英數混合';
  }
  return true;
});

// vee-validate：設定
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

// vee-validate：設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$filters = {
  transferToDate,
  transferSinceThen,
};
app.use(router);
app.use(VueAxios, axios);
app.component('VLoading', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
