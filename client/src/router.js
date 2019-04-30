import Vue from 'vue';
import VueRouter from 'vue-router';

import TracesAnalyzer from './pages/TracesAnalyzer';
import Vocabulary from './pages/Vocabulary';
import PageNotFound from './pages/PageNotFound';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: TracesAnalyzer
    },
    {
      name: 'vocabulary',
      path: '/vocabulary',
      component: Vocabulary
    },
    {
      name: 'notfound',
      path: '*',
      component: PageNotFound
    }
  ]
});
