<template>
  <div
    class="flex flex-row flex-nowrap justify-between items-center mb-2 basis-2/3 sm:w-full sm:px-0 sm:px-2 px-6"
  >
    <div class="basis-1/3 mx-2 px-1 md:block flex items-start">
      <div class="p-1 flex items-center justify-evenly">
        <slot name="icon">
          <UsersIcon
            class="w-12 h-12 text-emerald-100 group-hover/stat:bg-emerald-700 bg-emerald-600 rounded-lg p-2 transition duration-100 delay-75 ease-in-out"
          />
        </slot>
      </div>
    </div>
    <div
      class="flex sm:flex-col flex-row sm:justify-start justify-between sm:items-start items-center basis-2/3 mx-2"
    >
      <span
        class="md:text-sm text-zinc-400 group-hover/stat:text-emerald-600 transition duration-100 delay-75 ease-in-out"
        >{{ startCase(title) }}</span
      >
      <span class="text-3xl font-bold text-zinc-600 tracking-wider">12</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UsersIcon } from "@heroicons/vue/24/outline";
import startCase from "lodash/startCase";

interface StatBodyProps {
  title: string;
}

defineProps<StatBodyProps>();
</script>

<style scoped></style>
