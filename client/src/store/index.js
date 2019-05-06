import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    bugForm: false
  },
  getters: {
    bugForm(state) {
      return state.bugForm;
    }
  },
  mutations: {
    setBugForm(state, payload) {
      state.bugForm = payload;
    }
  },
  actions: {}
});
