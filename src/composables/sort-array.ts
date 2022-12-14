import { computed, ref, Ref, watch } from "vue";
import { useSortingStore } from "../stores/tables/sorting";
import { defineStore, storeToRefs } from "pinia";

// convert the use sort array composable to a store
export const useSortArrayStore = defineStore("sort-array", () => {
  const sortingStore = useSortingStore();
  const { getActiveSortField, getActiveSortDirection } =
    storeToRefs(sortingStore);

  const array: Ref<any[]> = ref([]);

  const originalArray: Ref<any[]> = ref([]);

  const header = ref("");

  const direction = ref("");

  watch(getActiveSortDirection, (newDirection) => {
    direction.value = newDirection;
  });

  watch(getActiveSortField, (newField) => {
    header.value = newField;
  });

  function setUpArrayStore(
    arrayToSort: Ref<any[]>,
    headerToSort: string,
    directionToSort: "asc" | "desc"
  ) {
    array.value = arrayToSort.value;
    originalArray.value = arrayToSort.value;
    header.value = headerToSort;
    direction.value = directionToSort;
  }

  function sortArray() {
    array.value.sort((a, b) => {
      if (a[header.value] < b[header.value]) {
        return direction.value === "asc" ? -1 : 1;
      }
      if (a[header.value] > b[header.value]) {
        return direction.value === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const getSortedArray = computed(() => {
    return array.value;
  });

  function resetSort() {
    array.value = originalArray.value;
  }

  return {
    setUpArrayStore,
    getSortedArray,
    sortArray,
    resetSort,
  };
});
