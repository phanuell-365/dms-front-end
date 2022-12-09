<template>
  <div
    class="flex flex-row flex-nowrap justify-between items-center md:my-2 py-4 px-6 md:mx-3 bg-white md:static sticky top-0"
  >
    <div>
      <!--  The page name  -->
      <h1 class="text-3xl font-bold">{{ startCase(routeName) }}</h1>
    </div>
    <div>
      <NewDocumentButton />
      <!-- Add new button   -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import NewDocumentButton from "./NewDocumentButton.vue";
import startCase from "lodash/startCase";

const route = useRoute();

const routeName = route.name;
</script>

<style scoped></style>
