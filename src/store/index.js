/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import products from "./modules/products";
import cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
  },
  getters: {
    // = computed properties
  },
  mutations: {},
  actions,
  modules: { products, cart },
});
