<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const model = reactive({
  email: "",
  password: "",
});

const submit = () =>
  store
    .dispatch("account/login", model)
    .then((bool) => (bool ? router.push("/") : null));
</script>

<template>
  <main class="login-view">
    <section class="login-card">
      <h2>Авторизация</h2>
      <form @submit.prevent="submit" novalidate>
        <label>
          E-mail
          <input type="text" v-model="model.email" />
        </label>
        <label>
          Пароль
          <input type="password" v-model="model.password" />
        </label>
        <button class="button button-success" disabled>Авторизоваться</button>
      </form>
    </section>
  </main>
</template>

<style scoped lang="scss">
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.login-card {
  min-width: 400px;
  transform: translateY(-20%);
  padding: 20px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  gap: 10px;

  & form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & label {
      display: flex;
      flex-direction: column;
    }

    & input {
      padding: 5px 10px;
      font-family: Arial, sans-serif;
      font-size: 18px;
    }
  }
}
</style>
