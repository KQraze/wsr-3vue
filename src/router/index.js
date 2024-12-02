import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    name: "cart",
    path: "/cart",
    component: () => import("@/views/CartView.vue"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    name: "order",
    path: "/order",
    component: () => import("@/views/OrdersView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const store = useStore();

  if (store.getters["account/isAuth"]) {
    if (["login", "register"].includes(to.name)) return { name: "home" };
  } else {
    if (["order", "cart"].includes(to.name)) return { name: "login" };
  }
});

export default router;
