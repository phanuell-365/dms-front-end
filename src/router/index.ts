import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      components: {
        LoginPage: () => import("../pages/LoginPage.vue"),
      },
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("../pages/HomePage.vue"),
    },
    {
      path: "/:notFound(.*)*",
      name: "not-found",
      component: () => import("../pages/NotFoundPage.vue"),
    },
  ],
});

export default router;
