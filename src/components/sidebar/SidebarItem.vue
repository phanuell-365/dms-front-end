<template>
  <!--  <RouterLink-->
  <!--    :to="`/${to}`"-->
  <!--    active-class="group hover:bg-emerald-800 bg-emerald-700 transition delay-100 duration-75 ease-in-out"-->
  <!--    class="hover:bg-emerald-700 my-3 py-2 rounded flex items-center transition delay-100 duration-75 ease-in-out"-->
  <!--  >-->
  <!--    <div class="px-2">-->
  <!--      <slot name="icon" />-->
  <!--    </div>-->
  <!--    <div class="px-2 text-emerald-50">{{ startCase(text) }}</div>-->
  <!--  </RouterLink>-->
  <AppLink
    :to="`/${to}`"
    active-class="group hover:bg-emerald-800 bg-emerald-700 my-3 py-2 rounded flex items-center transition delay-100 duration-75 ease-in-out"
    inactive-class="hover:bg-emerald-700 my-3 py-2 rounded flex items-center transition delay-100 duration-75 ease-in-out"
  >
    <div class="px-2">
      <slot name="icon" />
    </div>
    <div class="px-2 text-emerald-50">{{ startCase(text) }}</div>
  </AppLink>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";
import AppLink from "../links/AppLink.vue";

interface SidebarItemProps {
  text: string;
  to: string;
}

defineProps<SidebarItemProps>();
</script>

<style scoped></style>
