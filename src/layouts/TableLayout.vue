<template>
  <div class="text-sm">
    <div class="flex flex-wrap justify-between items-center pb-4 p-4">
      <div class="md:basis-auto basis-1/3 md:flex-grow-0 flex-grow">
        <slot name="search-menu" />
      </div>

      <div
        class="md:basis-auto basis-2/3 md:order-none order-last md:flex-grow-0 flex-grow md:mt-auto mt-5"
      >
        <slot name="search-input" />
      </div>

      <div class="md:basis-auto md:justify-self-auto justify-self-end">
        <slot name="actions-menu" />
      </div>
    </div>

    <div class="p-3">
      <slot name="table" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
