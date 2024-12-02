<script setup>
import MoneyBagIcon from "@/components/icons/MoneyBagIcon.vue";
import { defineProps, defineEmits } from "vue";
defineProps({
  countProducts: Number,
  totalPrice: Number,
});

defineEmits(["create-order"]);
</script>

<template>
  <section class="create-order">
    <h3 class="create-order__title">Оформить заказ:</h3>
    <p class="create-order__price">
      <span>{{ countProducts }} товаров</span>
      <span>{{ totalPrice }} &#8381;</span>
    </p>
    <money-bag-icon class="create-order__icon" @click="$emit('create-order')" />
  </section>
</template>

<style scoped lang="scss">
.create-order {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: linear-gradient(120deg, #b15b29, #ffb78d);
  border-radius: 20px;
  padding: 20px 20px 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  height: 200px;
  clip-path: circle(30px at right 40px bottom 38px);
  transition: clip-path 0.5s;

  &:hover {
    clip-path: circle(150% at 100% 100%);
  }

  &__title {
    font-size: 24px;
    color: white;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 22px;
    color: white;
  }

  &__icon {
    position: absolute;
    cursor: pointer;
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    color: white;
  }
}
</style>
