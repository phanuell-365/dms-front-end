<template>
  <div
    class="bg-gray-50 flex items-center justify-start flex-row"
    @click="onClick"
  >
    <span class="bg-gray-50 text-left">
      {{ startCase(header) }}
    </span>
    <div
      v-show="active"
      class="flex flex-row flex-nowrap justify-between items-center bg-gray-200 ml-2 rounded"
    >
      <span class="text-sm font-semibold text-gray-700">
        <ChevronUpIcon
          v-if="sortDirection === 'asc'"
          class="md:w-5 md:h-5 w-3 h-3 m-1"
        />
        <ChevronDownIcon
          v-else-if="sortDirection === 'desc'"
          class="md:w-5 md:h-5 w-3 h-3 m-1"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { useSortingStore } from "../../../stores/tables/sorting";
import { storeToRefs } from "pinia";
import startCase from "lodash/startCase";
import { useSortArrayStore } from "../../../composables/sort-array";

interface SortHeaderProps {
  header: string;
}

const sortingStore = useSortingStore();

const sortArrayStore = useSortArrayStore();

const { getActiveSortField, getActiveSortDirection } =
  storeToRefs(sortingStore);

const props = defineProps<SortHeaderProps>();

const sortDirection = computed(() => getActiveSortDirection.value);

const active = computed(() => getActiveSortField.value === props.header);

const header = computed(() => props.header);

const onClick = () => {
  sortingStore.setSortItem(props.header);
  // props.sortTable();
};

sortingStore.$subscribe(() => {
  if (sortingStore.getActiveSortField === props.header) {
    sortArrayStore.sortArray();
  }
});
</script>

<style scoped></style>
