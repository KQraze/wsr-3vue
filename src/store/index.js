import { createStore } from "vuex";
import orders from "./modules/orders";
import cart from "./modules/cart";
import account from "./modules/account";
import products from "./modules/products";

export default createStore({
  actions: {
    init: ({ dispatch }) => {
      dispatch("account/init").then(() => true);
      dispatch("products/getProducts").then(() => true);
    },
  },
  modules: {
    account,
    products,
    cart,
    orders,
  },
});
