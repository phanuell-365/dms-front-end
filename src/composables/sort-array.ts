import { ref, Ref } from "vue";
import { useSortingStore } from "../stores/tables/sorting";

export const useSortArray = (arr: Ref<object[]>) => {
  const sortingStore = useSortingStore();

  const currentSortField = ref(sortingStore.getActiveSortField);
  const currentSortDirection = ref(sortingStore.getActiveSortDirection);

  const sortArray = () => {
    const field = currentSortField.value;
    const direction = currentSortDirection.value;

    if (field) {
      arr.value.sort((a, b) => {
        // @ts-ignore
        if (a[field] < b[field]) {
          return direction === "asc" ? -1 : 1;
        }
        // @ts-ignore
        if (a[field] > b[field]) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
  };

  return {
    sortArray,
    currentSortField,
    currentSortDirection,
  };
};
