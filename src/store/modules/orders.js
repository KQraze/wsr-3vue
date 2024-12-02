import { $api } from "@/assets";

const state = {
  orders: [],
};

const getters = {
  getOrdersWithProducts: (state, getters, rootState) => {
    return state.orders.map((order) => {
      return {
        ...order,
        products: order.products.map((id) =>
          rootState.products.products.find((product) => product.id === id)
        ),
      };
    });
  },
};

const mutations = {
  setOrders: (state, orders) => (state.orders = [...orders]),
};

const actions = {
  getOrders: async ({ commit }) => {
    const { data } = await $api.get("order");
    commit("setOrders", data.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
