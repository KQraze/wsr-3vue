<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { isEmailValid, useValidation } from "@/assets";

const store = useStore();
const router = useRouter();

const validationSchema = {
  email: isEmailValid,
  password: (value) => value.length >= 8 && value.length <= 20,
};

const model = reactive({
  email: "",
  password: "",
});

const serverError = computed(() => store.state.account.error);

const { validations, hasValidationError } = useValidation(
  model,
  validationSchema
);

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
          <input
            type="text"
            :class="{ error: !validations.email }"
            v-model="model.email"
            placeholder="Введите email"
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            :class="{ error: !validations.password }"
            v-model="model.password"
            placeholder="Введите пароль"
          />
        </label>
        <button class="button button-success" :disabled="!hasValidationError">
          Авторизоваться
        </button>
        <p class="login-card__error" v-if="serverError">{{ serverError }}</p>
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

  &__error {
    text-align: center;
    color: #810d0d;
    font-weight: 500;
  }

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
      outline: none;

      &.error {
        border: 2px solid #d60000;
      }
    }
  }
}
</style>
