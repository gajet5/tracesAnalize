import Vue from 'vue';
import Vuetify from 'vuetify';
import App from '@/App.vue';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { store } from '@/store';
import router from '@/router';

Vue.use(Vuetify, {
  iconfont: 'md'
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
