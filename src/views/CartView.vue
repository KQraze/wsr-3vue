<script setup>
import ProductItem from "@/components/product/ProductItem.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import OrderCreate from "@/components/order/OrderCreate.vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const cart = computed(() => store.state.cart.cart);
const formattedCart = computed(() =>
  store.getters["cart/formattedCart"](cart.value)
);
const countProducts = computed(() => cart.value.length);
const totalPrice = computed(() =>
  store.state.cart.cart.reduce((acc, item) => acc + item.price, 0)
);

const addToCart = async (product_id) => {
  await store.dispatch("products/addToCart", product_id);
  await store.dispatch("cart/getCart");
};

const deleteFromCart = async (id) => {
  await store.dispatch("cart/deleteProduct", id);
};

onMounted(() => store.dispatch("cart/getCart"));
</script>

<template>
  <main class="cart-view">
    <h2>Корзина</h2>
    <div class="container">
      <section class="product-list">
        <product-item
          v-for="(product, i) in formattedCart"
          :key="i"
          v-bind="product"
          :is-cart="true"
          @add-to-cart="addToCart(i)"
          @delete-from-cart="deleteFromCart(product.id)"
          @delete-group="store.dispatch('cart/deleteGroup', i)"
        />
      </section>
      <order-create
        v-if="countProducts"
        :total-price="totalPrice"
        :count-products="countProducts"
        @create-order="
          store
            .dispatch('cart/createOrder')
            .then((response) =>
              response ? router.push({ name: 'order' }) : null
            )
        "
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.cart-view {
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
