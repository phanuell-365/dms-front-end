<template>
  <ApplicationLayout>
    <template #pages>
      <div>
        <StatsContainer />
      </div>
    </template>
  </ApplicationLayout>
</template>

<script lang="ts" setup>
import ApplicationLayout from "../layouts/ApplicationLayout.vue";
import StatsContainer from "../components/home/stats/StatsContainer.vue";
</script>

<style scoped></style>
