import { $api, headers } from "@/assets";
import { computed } from "vue";

const state = {
  token: localStorage.getItem("token") ?? null,
  error: null,
};

const getters = {
  isAuth: (state) => !!state.token,
};

const mutations = {
  setToken: (state, value) => (state.token = value),
  setError: (state, error) => (state.error = error),
};

const actions = {
  login: async ({ dispatch, commit }, { email, password }) => {
    commit("setError", null);

    const { data, status } = await $api.post("login", {
      email,
      password,
    });

    switch (status) {
      case 200:
        await dispatch("setToken", data.data?.user_token);
        return true;
      case 401:
        commit("setError", "Неправильный логин или пароль!");
    }

    return false;
  },
  register: async ({ dispatch, commit }, { fio, email, password }) => {
    commit("setError", null);

    const { data, status } = await $api.post("signup", {
      fio,
      email,
      password,
    });

    switch (status) {
      case 200 || 201:
        await dispatch("setToken", data.data?.user_token);
        return true;
      case 422:
        commit("setError", "Пользователь с таким email уже существует!");
    }

    return false;
  },

  logout: ({ dispatch }) =>
    $api.get("logout").then(() => dispatch("clearToken")),

  setToken: ({ commit }, value) => {
    if (value) {
      commit("setToken", value);
      localStorage.setItem("token", value);
    }
  },

  clearToken: ({ commit }) => {
    commit("setToken", null);
    localStorage.removeItem("token");
  },

  init: ({ state }) => {
    headers.Authorization = computed(() => `Bearer ${state.token}`);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
