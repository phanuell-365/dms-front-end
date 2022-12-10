<template>
  <ApplicationLayout>
    <template #pages>
      <RouterView></RouterView>
    </template>
  </ApplicationLayout>
</template>

<script lang="ts" setup>
import ApplicationLayout from "../../layouts/ApplicationLayout.vue";
</script>

<style scoped></style>
