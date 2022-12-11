<template>
  <MenuItem v-slot="{ active }">
    <button
      :class="[
        active ? 'bg-emerald-600 text-white' : 'text-zinc-800',
        'group bg-opacity-80 flex w-full items-center rounded-md px-2 py-2 text-sm',
      ]"
      @click="onClickHandler(text)"
    >
      <span>{{ startCase(text) }}</span>
    </button>
  </MenuItem>
</template>

<script lang="ts" setup>
import { MenuItem } from "@headlessui/vue";
import startCase from "lodash/startCase";

interface SearchMenuItemProps {
  text: string;
}

defineProps<SearchMenuItemProps>();

const emits = defineEmits<{
  (e: "search-key-click", searchKey: string): void;
}>();

const onClickHandler = (searchKey: string) => {
  emits("search-key-click", searchKey);
};
</script>

<style scoped></style>
