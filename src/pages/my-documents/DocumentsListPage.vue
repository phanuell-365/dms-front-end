<template></template>

<script lang="ts" setup>
import { useRouterStore } from "../../stores/router";
import { useRoute } from "vue-router";

const routerStore = useRouterStore();

const route = useRoute();

routerStore.setCurrentRoute(route?.name, route.path);

// onBeforeRouteUpdate((to, from, next) => {
//   routerStore.setCurrentRoute(to.name, to.path);
//
//   next();
// });
</script>

<style scoped></style>
