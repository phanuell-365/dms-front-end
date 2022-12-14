import { computed, ref, Ref } from "vue";
import { useSortingStore } from "../stores/tables/sorting";
import { defineStore, storeToRefs } from "pinia";

// convert the use sort array composable to a store
export const useSortArrayStore = defineStore("sort-array", () => {
  const sortingStore = useSortingStore();
  const { getActiveSortField, getActiveSortDirection } =
    storeToRefs(sortingStore);

  const array: Ref<any[]> = ref([]);

  const originalArray: Ref<any[]> = ref([]);

  const header = ref(getActiveSortField);

  const direction = ref(getActiveSortDirection);

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
