<template>
  <div
    class="md:rounded-lg shadow-lg border md:overflow-hidden overflow-x-auto"
  >
    <table
      class="w-full table table-auto md:text-sm text-xs text-left text-stone-500"
    >
      <slot />
    </table>
  </div>

  <div>
    <slot name="pagination" />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
