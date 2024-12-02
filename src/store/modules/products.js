import { $api } from "@/assets";

const state = {
  products: [],
};

const mutations = {
  setProducts: (state, products) => (state.products = [...products]),
};

const actions = {
  addToCart: (inject, product_id) => $api.post(`cart/${product_id}`),
  getProducts: ({ commit }) =>
    $api.get("products").then(({ data }) => commit("setProducts", data.data)),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
