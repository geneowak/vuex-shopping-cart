/* eslint-disable no-unused-vars */
import shop from "@/api/shop";

export default {
  namespaced: true,

  state: {
    items: [],
  },
  getters: {
    availableProducts(state, getters) {
      return state.items.filter((product) => product.inventory > 0);
    },
    productIsInStock() {
      return (product) => product.inventory > 0;
    },
  },
  mutations: {
    // = responsible for single state changes
    setProducts(state, products) {
      state.items = products;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
  },
  actions: {
    fetchProducts(context) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        shop.getProducts((products) => {
          context.commit("setProducts", products);
          resolve();
        });
      });
    },
  },
};
