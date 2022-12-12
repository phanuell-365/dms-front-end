<template>
  <th class="md:p-2" scope="col">
    <div class="flex items-center justify-center">
      <input
        id="tableRow"
        class="w-4 h-4 text-emerald-600 focus:text-emerald-600 bg-emerald-100 rounded border-emerald-600 focus:ring-emerald-600 focus:ring-2"
        name="tableRow"
        type="checkbox"
        @click="onCheckboxClick"
      />
      <label class="sr-only" for="tableRow">checkbox</label>
    </div>
  </th>
  <th v-for="header in headers" :key="header" class="md:py-3 py-2 px-3">
    {{ startCase(header) }}
  </th>
  <th class="px-3 py-2">Action</th>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";

interface TableHeaderProps {
  headers: string[];
}

const props = defineProps<TableHeaderProps>();

const emits = defineEmits<{
  (e: "selection", action: "select-all" | "unselect-all"): void;
}>();

const onCheckboxClick = (event: Event) => {
  const checkbox = event.target as HTMLInputElement;

  if (checkbox.checked) {
    emits("selection", "select-all");
  } else if (!checkbox.checked) {
    emits("selection", "unselect-all");
  }
};
</script>

<style scoped></style>
