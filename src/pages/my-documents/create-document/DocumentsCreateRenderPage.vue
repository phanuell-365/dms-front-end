<template>
  <FormLayout>
    <template #left>
      <RouterView />
    </template>
    <template #right>
      <FormFileUpload />
    </template>
  </FormLayout>
</template>

<script lang="ts" setup>
import { useRouterStore } from "../../../stores/router";
import { useRoute } from "vue-router";
import FormLayout from "../../../layouts/FormLayout.vue";
import FormFileUpload from "../../../components/forms/FormFileUpload.vue";

const routerStore = useRouterStore();

const route = useRoute();

// @ts-ignore
routerStore.setCurrentRoute(route?.name, route.path);

// onBeforeRouteUpdate((to, from, next) => {
//   routerStore.setCurrentRoute(to.name, to.path);
//
//   next();
// });
</script>

<style scoped></style>
