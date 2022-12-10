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
      path: "/documents",
      component: () => import("../pages/my-documents/DocumentsRenderPage.vue"),
      children: [
        {
          path: "",
          name: "documents",
          component: () => import("../pages/my-documents/DocumentsPage.vue"),
        },
        {
          path: "list",
          name: "documents-list",
          component: () =>
            import("../pages/my-documents/DocumentsListPage.vue"),
        },
        {
          path: "create",
          name: "create-document",
          component: () =>
            import("../pages/my-documents/DocumentsCreatePage.vue"),
        },
        {
          path: "edit/:id",
          name: "edit-document",
          component: () =>
            import("../pages/my-documents/DocumentsEditPage.vue"),
        },
        {
          path: "view/:id",
          name: "view-document",
          component: () =>
            import("../pages/my-documents/DocumentsViewPage.vue"),
        },
      ],
    },
    {
      path: "/:notFound(.*)*",
      name: "not-found",
      component: () => import("../pages/NotFoundPage.vue"),
    },
  ],
});

export default router;
