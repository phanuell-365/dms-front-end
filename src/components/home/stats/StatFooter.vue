<template>
  <RouterLink
    :to="to"
    class="mt-1 md:bg-zinc-50 md:w-full md:pl-3 md:py-2 sm:block flex flex-row items-center justify-start content-around px-6"
  >
    <div
      class="text-emerald-600 text-sm group/nav basis-1/3 sm:block flex flex-row items-center justify-center"
    >
      <span>View all</span>
      <ChevronRightIcon
        class="w-4 h-4 inline-block mx-1 invisible group-hover/stat:visible group-hover/nav:translate-x-0.5 transition duration-100 delay-75 ease-in-out transform"
      />
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

interface StatFooterProps {
  to: string;
}

defineProps<StatFooterProps>();
</script>

<style scoped></style>
