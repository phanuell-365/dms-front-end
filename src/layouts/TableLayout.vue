<template>
  <div class="">
    <div class="flex flex-wrap justify-between items-center pb-4 p-4">
      <div class="sm:basis-auto basis-1/3 md:flex-grow-0 flex-grow">
        <slot name="search-menu" />
      </div>

      <div
        class="sm:basis-auto basis-2/3 md:order-none order-last md:flex-grow-0 flex-grow md:mt-auto mt-5"
      >
        <slot name="search-input" />
      </div>

      <div class="sm:basis-auto md:justify-self-auto justify-self-end">
        <slot name="actions-menu" />
      </div>
    </div>

    <div class="p-3">
      <slot name="table" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface AppTableContainerProps {
  searchKey: string;
}

const props = defineProps<AppTableContainerProps>();

const searchInputPlaceholder = computed(
  () => `Search for documents by ${props.searchKey}`
);
</script>

<style scoped></style>
