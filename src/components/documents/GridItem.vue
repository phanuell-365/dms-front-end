<template>
  <div
    class="group/grid md:basis-1/2 px-4 p-1 md:first:mt-auto first:mt-8 md:my-auto my-5 last:mb-8 md:last:mb-auto border bg-white sm:text-base text-sm rounded-0"
  >
    <div
      class="flex flex-row md:justify-between md:flex-wrap md:items-start items-center m-1"
    >
      <div class="flex justify-between md:mx-0 mx-5">
        <slot name="icon">
          <DocumentPlusIcon
            class="w-12 h-12 m-2 bg-sky-50 group-hover/grid:bg-sky-100 text-sky-600 rounded-lg p-3 self-center"
          />
        </slot>
      </div>
      <RouterLink :to="to" class="md:order-none order-last flex md:mx-0 mx-5">
        <ArrowUpIcon
          :class="`hover:text-${color}-400`"
          class="w-7 h-7 transition transform md:rotate-45 rotate-90 text-zinc-400 md:mt-2 md:hover:translate-x-0.5 hover:translate-x-1 md:hover:-translate-y-0.5"
        />
      </RouterLink>
      <div
        class="flex flex-col md:order-last items-start justify-start md:mx-0 mx-5"
      >
        <div class="my-2 font-bold text-zinc-700 font-poppins-light">
          {{ title }}
        </div>
        <div class="my-1 text-sm text-zinc-500 hidden md:block">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowUpIcon, DocumentPlusIcon } from "@heroicons/vue/24/outline";

interface GridItemProps {
  // displays the title as is
  title: string;
  description: string;
  color: string;
  to: string;
}

defineProps<GridItemProps>();
</script>

<style scoped></style>
