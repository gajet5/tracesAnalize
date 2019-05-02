import Vue from 'vue';
import Vuetify from 'vuetify';
import App from '@/App.vue';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import router from '@/router';
import { store } from '@/store';

Vue.use(Vuetify, {
  iconfont: 'md'
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
