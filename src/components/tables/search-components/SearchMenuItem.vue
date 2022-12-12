<template>
  <MenuItem v-slot="{ active }" :disabled="disabled">
    <button
      :class="{
        'bg-emerald-600 text-white': active,
        'text-zinc-800': !active,
        'opacity-60': disabled,
      }"
      class="group bg-opacity-80 flex w-full items-center rounded-md px-2 py-2 text-sm"
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
  disabled?: boolean;
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
