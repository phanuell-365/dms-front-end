<template>
  <!-- This component displays the number of items selected -->
  <div
    v-if="getIsAnyItemSelected"
    class="flex flex-row flex-nowrap items-center justify-between px-2 py-1 font-poppins-light text-3xs text-gray-500 bg-gray-100 rounded-md"
  >
    <div class="flex flex-row flex-nowrap items-center">
      <div class="mr-2">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </div>
      <div>
        {{ getSelectedItemsCount }}
        {{ getSelectedItemsCount > 1 ? "items" : "item" }}
        selected
      </div>
    </div>
    <div class="flex flex-row flex-nowrap items-center">
      <div class="mr-2">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </div>
      <div>
        <button
          class="text-3xs font-poppins-light text-gray-500 hover:text-gray-700"
          @click="onClearSelection"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSelectionStore } from "../../../stores/tables/selection";
import { storeToRefs } from "pinia";

const selectionStore = useSelectionStore();

const { getSelectedItemsCount, getIsAnyItemSelected } =
  storeToRefs(selectionStore);

const onClearSelection = () => {
  selectionStore.deselectAllItems();
};
</script>

<style scoped></style>
