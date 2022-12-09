<template>
  <MenuItem v-slot="{ active }">
    <button
      :class="[
        active ? 'bg-emerald-500 text-white' : 'text-emerald-900',
        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
      ]"
    >
      <span class="mr-2">
        <slot :active="active" name="icon" />
      </span>
      <span>{{ startCase(text) }}</span>
    </button>
  </MenuItem>
</template>

<script lang="ts" setup>
import { MenuItem } from "@headlessui/vue";
import startCase from "lodash/startCase";

interface AvatarMenuItemProps {
  text: string;
}

defineProps<AvatarMenuItemProps>();
</script>

<style scoped></style>
