<template>
  <td v-show="selectionMode" class="py-4 px-3">
    <div class="flex items-center justify-center">
      <input
        id="tableRow"
        ref="checkboxRef"
        :value="value"
        class="w-4 h-4 text-sky-600 focus:text-sky-600 bg-gray-100 rounded border-gray-300 focus:ring-emerald-500 focus:ring-2"
        name="tableRow"
        type="checkbox"
        @click="onCheckboxClick"
      />
      <label class="sr-only" for="tableRow">checkbox</label>
    </div>
  </td>
</template>

<script lang="ts" setup>
import { useSelectionStore } from "../../../stores/tables/selection";
import { computed, onBeforeUpdate, onMounted, ref, Ref } from "vue";

interface TableCheckboxProps {
  value: string;
}

const selectionStore = useSelectionStore();

const props = defineProps<TableCheckboxProps>();

const checkboxRef: Ref<HTMLInputElement | undefined> = ref();

// check if the item is selected in the store, if selected, change the checkbox state to selected

selectionStore.$subscribe(() => {
  if (selectionStore.isSelected(props.value)) {
    if (checkboxRef.value) {
      checkboxRef.value.checked = true;
    }
  } else {
    if (checkboxRef.value) {
      checkboxRef.value.checked = false;
    }
  }
});

onMounted(() => {
  if (selectionStore.isSelected(props.value)) {
    if (checkboxRef.value) {
      checkboxRef.value.checked = true;
    }
  } else {
    if (checkboxRef.value) {
      checkboxRef.value.checked = false;
    }
  }
});

onBeforeUpdate(() => {
  if (selectionStore.isSelected(props.value)) {
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
  // on checkbox click we need to update the selection store
  const checkbox = event.target as HTMLInputElement;

  if (checkbox.checked) {
    selectionStore.selectItem(props.value);
  } else if (!checkbox.checked) {
    selectionStore.deselectItem(props.value);
  }
};

const selectionMode = computed(() => selectionStore.selectionMode);
</script>

<style scoped></style>
