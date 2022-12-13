import { computed, ref, Ref, watch } from "vue";
import { defineStore } from "pinia";
import { useSearchTable } from "../../composables/search-table";

export const useSearchResults = defineStore("search-results", <T>() => {
  const documents: Ref<T[]> = ref([]);
  const query: Ref<string> = ref("");
  const selectedSearchKey: Ref<string> = ref("");
  const results: Ref<T[]> = ref([]);
  const resultsCount: Ref<number> = ref(0);

  function setUpTheStore(
    docs: Ref<T[]>,
    searchKey: Ref<string>,
    searchQuery: Ref<string>
  ) {
    documents.value = docs.value;
    selectedSearchKey.value = searchKey.value;
    query.value = searchQuery.value;

    results.value = docs.value;

    resultsCount.value = docs.value.length;

    watch(searchKey, (value) => {
      selectedSearchKey.value = searchKey.value;
      const filteredRecords = useSearchTable(
        query,
        selectedSearchKey,
        documents
      );
      results.value = value === "" ? documents.value : filteredRecords.value;
      resultsCount.value = results.value.length;
    });

    watch(searchQuery, (value) => {
      query.value = searchQuery.value;

      const filteredRecords = useSearchTable(
        query,
        selectedSearchKey,
        documents
      );

      results.value = value === "" ? documents.value : filteredRecords.value;
      resultsCount.value = results.value.length;
    });
  }

  const getDocuments = computed(() => documents.value);

  const getResults = computed(() => results.value);

  const getResultsCount = computed(() => resultsCount.value);

  return {
    setUpTheStore,
    getDocuments,
    getResults,
    getResultsCount,
    query,
    results,
    resultsCount,
  };
});
