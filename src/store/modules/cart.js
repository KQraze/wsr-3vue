import { $api } from "@/assets";

const state = {
  cart: [],
};

const getters = {
  formattedCart:
    () =>
    (cart, isCart = true) => {
      const id = isCart ? "product_id" : "id";

      return cart.reduce((formattedCart, cartItem) => {
        if (!formattedCart[cartItem[id]]) {
          formattedCart[cartItem[id]] = {
            ...cartItem,
            count: 1,
            products: [cartItem],
          };
        } else {
          formattedCart[cartItem[id]].count++;
          formattedCart[cartItem[id]].products.push(cartItem);
        }

        return formattedCart;
      }, {});
    },
};

const mutations = {
  setCart: (state, cart) => (state.cart = [...cart]),
};

const actions = {
  getCart: async ({ commit }) => {
    const { data } = await $api.get("cart");
    commit("setCart", data.data);
  },
  deleteProduct: async ({ dispatch }, id) => {
    await $api.delete(`cart/${id}`);
    await dispatch("getCart");
  },
  deleteGroup: async ({ state, getters, dispatch }, product_id) => {
    let requests = [];

    for (const product of getters.formattedCart(state.cart)[product_id]
      .products) {
      requests.push(async () => await $api.delete(`cart/${product.id}`));
    }

    await Promise.all([...requests.map((request) => request())]);
    await dispatch("getCart");
  },
  createOrder: async ({ dispatch }) => {
    try {
      await $api.post("order");
      await dispatch("getCart");

      return true;
    } catch (e) {
      console.error(e);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
