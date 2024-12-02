<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { isEmailValid, useValidation } from "@/assets";

const store = useStore();
const router = useRouter();

const validationSchema = {
  firstName: (value) => value.length,
  lastName: (value) => value.length,
  email: (value) => isEmailValid(value),
  password: (value) => value.length >= 8 && value.length <= 20,
};

const model = reactive({
  firstName: "",
  lastName: "",
  middleName: "",
  fio: computed(
    () => model.lastName + " " + model.firstName + " " + model.middleName
  ),
  email: "",
  password: "",
});

const { validations, hasValidationError } = useValidation(
  model,
  validationSchema
);

const submit = () =>
  store
    .dispatch("account/register", model)
    .then((bool) => (bool ? router.push("/") : null));
</script>

<template>
  <main class="reg-view">
    <section class="reg-card">
      <h2>Регистрация</h2>
      <form @submit.prevent="submit" novalidate>
        <label>
          Фамилия*
          <input
            type="text"
            :class="{ error: !validations.lastName }"
            v-model="model.lastName"
            placeholder="Введите фамилию"
          />
        </label>
        <label>
          Имя*
          <input
            type="text"
            :class="{ error: !validations.firstName }"
            v-model="model.firstName"
            placeholder="Введите имя"
          />
        </label>
        <label>
          Отчество
          <input
            type="text"
            v-model="model.middleName"
            placeholder="Введите отчество"
          />
        </label>
        <label>
          E-mail*
          <input
            type="text"
            :class="{ error: !validations.email }"
            v-model="model.email"
            placeholder="Введите email"
          />
        </label>
        <label>
          Пароль*
          <input
            type="password"
            :class="{ error: !validations.password }"
            v-model="model.password"
            placeholder="Введите пароль"
          />
        </label>
        <button class="button button-success" :disabled="!hasValidationError">
          Зарегистрироваться
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped lang="scss">
.reg-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.reg-card {
  transform: translateY(-10%);
  min-width: 400px;
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
      outline: none;

      &.error {
        border: 2px solid #d60000;
      }
    }
  }
}
</style>
