import { computed, ref, Ref, watch } from "vue";
import { defineStore } from "pinia";
import { useSearchTable } from "../../composables/search-table";
import { ITEMS_PER_PAGE } from "./const";

export const useSearchResultsStore = defineStore("search-results", <T>() => {
  const items: Ref<T[]> = ref([]);
  const query: Ref<string> = ref("");
  const selectedSearchKey: Ref<string> = ref("");
  const results: Ref<T[]> = ref([]);
  const resultsCount: Ref<number> = ref(0);

  function setUpTheStore(
    docs: Ref<T[]>,
    searchKey: Ref<string>,
    searchQuery: Ref<string>
  ) {
    items.value = docs.value;
    selectedSearchKey.value = searchKey.value;
    query.value = searchQuery.value;

    results.value = docs.value;

    resultsCount.value = docs.value.length;

    watch(searchKey, (value) => {
      selectedSearchKey.value = searchKey.value;
      const filteredRecords = useSearchTable(query, selectedSearchKey, items);
      results.value = value === "" ? items.value : filteredRecords.value;
      resultsCount.value = results.value.length;
    });

    watch(searchQuery, (value) => {
      query.value = searchQuery.value;

      const filteredRecords = useSearchTable(query, selectedSearchKey, items);

      results.value = value === "" ? items.value : filteredRecords.value;
      resultsCount.value = results.value.length;
    });
  }

  function reset() {
    results.value = items.value;
    resultsCount.value = items.value.length;
  }

  const getTotalPageCount = computed(() => {
    return Math.ceil(resultsCount.value / ITEMS_PER_PAGE);
  });

  const getItems = computed(() => items.value);

  const getResults = computed(() => results.value);

  const getResultsCount = computed(() => resultsCount.value);

  return {
    setUpTheStore,
    getItems,
    getResults,
    getResultsCount,
    query,
    selectedSearchKey,
    getTotalPageCount,
    reset,
    results,
    resultsCount,
  };
});
