<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const isAuth = computed(() => store.getters["account/isAuth"]);
</script>

<template>
  <header class="header">
    <div class="container">
      <h3><router-link to="/">Просто купить &#8381;</router-link></h3>
      <nav class="header__navigation">
        <template v-if="isAuth">
          <router-link :to="{ name: 'cart' }">Корзина</router-link>
          <router-link :to="{ name: 'order' }">Заказы</router-link>
          <router-link
            :to="{ name: 'home' }"
            @click="store.dispatch('account/logout')"
          >
            Выйти
          </router-link>
        </template>
        <template v-else>
          <router-link :to="{ name: 'login' }">Войти</router-link>
          <router-link :to="{ name: 'register' }">
            Зарегистрироваться
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  top: 0;
  position: sticky;
  width: 100%;
  background: #ffece1;
  font-size: 22px;
  box-shadow: var(--shadow);

  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
  }
  &__navigation {
    display: flex;
    gap: 20px;
  }
}
</style>
