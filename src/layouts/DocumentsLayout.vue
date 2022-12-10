<template>
  <div
    class="flex md:flex-row flex-col flex-nowrap justify-evenly md:mx-0.5 px-4 md:px-0.5 mx-5"
  >
    <div class="basis-2/3">
      <slot name="left" />
    </div>
    <div class="basis-1/3">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
