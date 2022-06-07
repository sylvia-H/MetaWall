import { createApp } from 'vue';
// TailwindCSS
import './styles/all.scss';
// iconfont
import 'bootstrap-icons/font/bootstrap-icons.css';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 自定義 methods
import { transferToDate } from './methods/filters';
// purge-icons
import '@purge-icons/generated';

// 載入 router & APP
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.$filters = {
  transferToDate,
};
app.use(router);
app.use(VueAxios, axios);
app.component('VLoading', Loading);
app.mount('#app');
