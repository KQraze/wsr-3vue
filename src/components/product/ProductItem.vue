<script setup>
import { computed, ref, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  image: String,
  description: String,
  count: Number,
  products: Array,
});

const emits = defineEmits(["add-to-cart", "delete-from-cart", "delete-group"]);

const store = useStore();
const route = useRoute();

const countInGroup = ref(Number(props.products?.length));

const isOrder = computed(() => route.name === "order");
const isCart = computed(() => route.name === "cart");
const isAuth = computed(() => store.getters["account/isAuth"]);
const imagePath = computed(() => "http://jztcjyj-m2.wsr.ru/" + props.image);

const addProductToCart = () => {
  emits("add-to-cart");
  countInGroup.value++;
};

const deleteProduct = () => {
  emits("delete-from-cart");
  countInGroup.value--;
};
</script>

<template>
  <article class="product-item">
    <header class="product-item__content">
      <img class="product-item__image" :src="imagePath" alt="image" />
      <div class="product-item__text">
        <h3>{{ name }}</h3>
        <p class="product-item__desc">{{ description }}</p>
      </div>
    </header>
    <footer class="product-item__footer">
      <p class="product-item__price">
        <span>{{ price }} &#8381;</span>
        <span v-if="isCart || isOrder">{{ countInGroup }} шт.</span>
      </p>
      <template v-if="isCart">
        <div class="product-item__buttons">
          <div>
            <button class="button button-green" @click="addProductToCart">
              +
            </button>
            <button class="button button-danger" @click="deleteProduct">
              -
            </button>
          </div>
          <button class="button button-danger" @click="emits('delete-group')">
            Удалить
          </button>
        </div>
      </template>
      <template v-else-if="!isOrder">
        <button
          v-if="isAuth"
          class="button button-success"
          @click="emits('add-to-cart')"
        >
          Добавить в корзину
        </button>
      </template>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.product-item {
  padding: 10px 15px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background: white;
  gap: 10px;
  border-radius: 5px;

  &__image {
    width: 100%;
    object-fit: contain;
    height: 300px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 5px;

    & h3 {
      font-size: 18px;
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
    }
  }

  &__desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    max-width: 100%;
    overflow: hidden;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__price {
    font-size: 24px;
    display: inline-flex;
    justify-content: space-between;
  }
  &__buttons {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;

    & > div {
      display: flex;
      gap: 15px;
    }
  }
}
</style>
