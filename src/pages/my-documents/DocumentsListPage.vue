<template>
  <div class="rounded-lg shadow-lg bg-white mt-5">
    <AppTableContainer :search-keys="['title', 'creator', 'sender']" />
  </div>
</template>

<script lang="ts" setup>
import { useRouterStore } from "../../stores/router";
import { useRoute } from "vue-router";
import AppTableContainer from "../../components/tables/AppTableContainer.vue";

const routerStore = useRouterStore();

const route = useRoute();

// @ts-ignore - This is a workaround for a bug in Vue Router 4.0.0-beta.13.
routerStore.setCurrentRoute(route?.name, route.path);

// onBeforeRouteUpdate((to, from, next) => {
//   routerStore.setCurrentRoute(to.name, to.path);
//
//   next();
// });
</script>

<style scoped></style>
