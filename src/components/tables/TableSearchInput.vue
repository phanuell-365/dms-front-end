<template>
  <label class="sr-only" for="table-search">Search</label>
  <div class="relative">
    <div
      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5 text-zinc-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>
    <input
      id="table-search"
      :placeholder="searchInputPlaceholder"
      :value="modelValue"
      autocomplete="off"
      class="block p-2 pl-10 md:w-80 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-opacity-20 border-emerald-600 focus:outline-none focus:ring-1 focus:ring-opacity-40 focus:ring-emerald-600 focus:border-emerald-600"
      type="text"
      @focus="onFocus"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface TableSearchInputProps {
  modelValue: unknown;
  searchKey: string;
}

const props = defineProps<TableSearchInputProps>();

const searchInputPlaceholder = computed(
  () => `Search for documents by ${props.searchKey}`
);

const emits = defineEmits(["update:modelValue", "search-input-focus"]);

const onFocus = () => {
  emits("search-input-focus");
};
</script>

<style scoped></style>
