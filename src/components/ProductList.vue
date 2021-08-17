<template>
  <div>
    <h2>Product list</h2>
    <h5 v-if="loading">loading...</h5>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.inventory }}
        <button
          :disabled="!productInStock(product)"
          @click="addToCart(product)"
        >
          add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.items,
    }),
    ...mapGetters("products", {
      productInStock: "productIsInStock",
    }),
  },
  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      addToCart: "cart/addProductToCart",
      fetchProducts: "products/fetchProducts",
    }),
  },
};
</script>

<style></style>
