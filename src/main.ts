import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
import 'normalize.css';
import '@/assets/style/common.scss';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { size: 'small' });
app.mount('#app');
