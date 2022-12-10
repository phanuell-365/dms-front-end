<template>
  <div
    class="group/table shadow-xl mx-3 py-2 px-3 bg-white basis-full md:w-auto w-1/2"
  >
    <div class="m-1 p-2 text-sm uppercase font-bold tracking-widest">
      {{ tableName }}
    </div>
    <div class="m-1 p-2">
      <div class="overflow-x-auto relative">
        <slot name="table" />
      </div>

      <div
        class="flex invisible group-hover/table:visible justify-end text-3xs font-poppins-light px-4 mt-4"
      >
        <RouterLink
          :to="`${href}`"
          class="flex group/view-all relative items-center whitespace-nowrap rounded-full py-1 px-4 pr-3 text-sm text-stone-500 transition hover:bg-stone-200 hover:bg-stone text-stone-500 transition"
          role="button"
        >
          <span class="font-semibold transition hover:text-stone-700">
            {{ startCase("view all") }}
          </span>
          <ChevronRightIcon
            class="w-5 h-5 transition group-hover/view-all:translate-x-1 mt-px"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { startCase } from "lodash";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

interface DashTableComponentProps {
  tableName: string;
  href: string;
}

defineProps<DashTableComponentProps>();
</script>

<style scoped></style>
