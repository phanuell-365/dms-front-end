<template>
  <div
    class="flex flex-row flex-nowrap justify-between items-center md:my-2 py-4 px-6 md:mx-3 bg-white md:static sticky top-0"
  >
    <div>
      <!--  The page name  -->
      <h1 class="md:text-3xl text-2xl font-bold">{{ startCase(routeName) }}</h1>
    </div>
    <div>
      <NewDocumentButton />
      <!-- Add new button   -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import NewDocumentButton from "./NewDocumentButton.vue";
import startCase from "lodash/startCase";
import { ref } from "vue";
import { useRouterStore } from "../../stores/router";

const routerStore = useRouterStore();

const routeName = ref("");

routeName.value = routerStore.getCurrentRouteName;

routerStore.$subscribe((mutation, state) => {
  routeName.value = state.currentRouteName;
  console.error(routeName.value);
  console.error(state.currentRouteName);
});
</script>

<style scoped></style>
