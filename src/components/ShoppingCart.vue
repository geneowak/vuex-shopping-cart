<template>
  <div>
    <h4>Shopping Cart</h4>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <button v-if="total > 0" @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">Checkout status: {{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotal",
    }),
    ...mapState("cart", {
      checkoutStatus: (state) => state.checkoutStatus,
    }),
  },
  methods: {
    ...mapActions("cart", ["checkout"]),
  },
};
</script>

<style></style>
