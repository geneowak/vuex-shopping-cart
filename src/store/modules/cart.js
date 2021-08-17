/* eslint-disable no-unused-vars */
import shop from "@/api/shop";

export default {
  namespaced: true,

  state: {
    // {id: 1, quantity:0}
    items: [],
    checkoutStatus: null,
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map((item) => {
        const product = rootState.products.items.find((x) => x.id === item.id);
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        };
      });
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, item) => {
        return item.price * item.quantity + total;
      }, 0);
    },
  },
  mutations: {
    addItemToCart(state, productId) {
      state.items.push({ id: productId, quantity: 1 });
    },
    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    emptyCart(state) {
      state.items = [];
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
  },
  actions: {
    addProductToCart({ state, commit, getters, rootGetters }, product) {
      if (rootGetters["products/productIsInStock"]) {
        const cartItem = state.items.find((item) => item.id === product.id);
        if (!cartItem) {
          commit("addItemToCart", product.id);
        } else {
          commit("incrementCartItemQuantity", cartItem);
        }
        commit("products/decrementProductInventory", product, { root: true });
      }
    },

    checkout({ state, commit }) {
      shop.buyProducts(
        state.items,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "failed");
        }
      );
    },
  },
};
