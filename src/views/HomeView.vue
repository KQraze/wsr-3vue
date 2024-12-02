<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import ProductItem from "@/components/product/ProductItem.vue";

const store = useStore();

const products = computed(() => store.state.products.products);

const addToCart = (id) => {
  store.dispatch("products/addToCart", id);
};
</script>

<template>
  <main class="home-view">
    <h2>Каталог товаров</h2>
    <div class="container">
      <section class="product-list">
        <product-item
          v-for="(product, i) in products"
          :key="i"
          v-bind="product"
          @add-to-cart="addToCart(product.id)"
        />
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-block: 20px;

  & h2 {
    font-size: 28px;
    text-align: center;
  }
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  flex-wrap: wrap;
  gap: 20px;
}
</style>
