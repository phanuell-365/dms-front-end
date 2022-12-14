<template>
  <th v-show="selectionMode" class="md:p-2" scope="col">
    <div class="flex items-center justify-center">
      <input
        id="tableRow"
        ref="checkboxRef"
        class="w-4 h-4 text-emerald-600 focus:text-emerald-600 bg-emerald-100 rounded border-emerald-600 focus:ring-emerald-600 focus:ring-2"
        name="tableRow"
        type="checkbox"
        @click="onCheckboxClick"
      />
      <label class="sr-only" for="tableRow">checkbox</label>
    </div>
  </th>
  <th
    v-for="header in headers"
    :key="header"
    class="md:py-3 py-2 px-3 tracking-wider cursor-pointer"
  >
    <SortHeader :header="header" />
  </th>
  <th class="px-3 py-2">Action</th>
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from "vue";
import { useSelectionStore } from "../../../stores/tables/selection";
import SortHeader from "../sorting/SortHeader.vue";

interface TableHeaderProps {
  headers: string[];
}

defineProps<TableHeaderProps>();

const emits = defineEmits<{
  (e: "selection", action: "select-all" | "unselect-all"): void;
}>();

const checkboxRef: Ref<HTMLInputElement | undefined> = ref();

const selectionStore = useSelectionStore();

selectionStore.$subscribe(() => {
  if (selectionStore.getIsAllItemsSelected) {
    if (checkboxRef.value) {
      checkboxRef.value.checked = true;
    }
  } else {
    if (checkboxRef.value) {
      checkboxRef.value.checked = false;
    }
  }
});

const onCheckboxClick = (event: Event) => {
  const checkbox = event.target as HTMLInputElement;

  if (checkbox.checked) {
    emits("selection", "select-all");
  } else if (!checkbox.checked) {
    emits("selection", "unselect-all");
  }
};

const selectionMode = computed(() => selectionStore.selectionMode);
</script>

<style scoped></style>
