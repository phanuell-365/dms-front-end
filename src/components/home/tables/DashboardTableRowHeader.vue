<template>
  <th
    :class="{ 'font-bold': isUnread, 'font-medium': !isUnread }"
    class="py-2 px-3 text-gray-900 whitespace-nowrap"
    scope="row"
  >
    <slot />
  </th>
</template>

<script lang="ts" setup>
interface DashboardTableRowHeaderProps {
  isUnread?: boolean;
}

defineProps<DashboardTableRowHeaderProps>();
</script>

<style scoped></style>
