<template>
  <div class="home">
    <ProductList />
    <hr />
    <ShoppingCart />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList";
import ShoppingCart from "@/components/ShoppingCart";
export default {
  name: "Home",
  components: { ProductList, ShoppingCart },
};
</script>
