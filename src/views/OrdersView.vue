<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import ProductItem from "@/components/product/ProductItem.vue";

const store = useStore();

const orders = computed(() => store.getters["orders/getOrdersWithProducts"]);
const formattedOrders = computed(
  () => (products) => store.getters["cart/formattedCart"](products, false)
);

onMounted(() => store.dispatch("orders/getOrders"));
</script>

<template>
  <main class="order-view">
    <h2>Ваши заказы</h2>
    <div class="container">
      <section class="order-list">
        <article class="order-item" v-for="(order, i) in orders" :key="i">
          <div class="order-item__products">
            <product-item
              v-for="(product, j) in formattedOrders(order.products)"
              :key="j"
              v-bind="product"
            />
          </div>
          <p class="order-item__price">
            Заказ №{{ order.id }}: {{ order.order_price }} &#8381;
          </p>
        </article>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.order {
  &-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-block: 20px;

    & h2 {
      font-size: 28px;
      text-align: center;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-item {
    box-shadow: var(--shadow);
    background: white;
    display: flex;
    padding: 20px;
    gap: 20px;
    flex-direction: column;

    &__products {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      flex-wrap: wrap;
      gap: 20px;
    }
    &__price {
      font-size: 24px;
    }
  }
}
</style>
