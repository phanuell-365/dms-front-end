<template>
  <div
    class="md:rounded-lg shadow-lg border md:overflow-hidden overflow-x-auto"
  >
    <SelectionContainer />
    <table
      class="w-full table table-auto md:text-sm text-xs text-left text-stone-500"
    >
      <slot />
    </table>
  </div>

  <div>
    <PaginationContainer
      :rows-per-page="recordsPerPage"
      :total-pages="getTotalPageCount"
      :total-rows="getResultsCount"
      @previous-page="onPreviousPageClick"
      @next-page="onNextPageClick"
      @page-number="onPageClick"
    />
  </div>
</template>

<script lang="ts" setup>
import PaginationContainer from "../pagination/PaginationContainer.vue";
import { useSearchResultsStore } from "../../../stores/tables/results";
import { storeToRefs } from "pinia";
import { ITEMS_PER_PAGE } from "../../../stores/tables/const";
import { computed, inject, Ref } from "vue";
import { currentPageKey } from "../../../keys";
import SelectionContainer from "../selection/SelectionContainer.vue";

const currentPage = inject<Ref<number>>(currentPageKey);

const resultsStore = useSearchResultsStore();

const { getTotalPageCount, getResultsCount } = storeToRefs(resultsStore);

const recordsPerPage = computed(() => ITEMS_PER_PAGE);

const emits = defineEmits<{
  (event: "page-click", pageNumber: number): void;
}>();

const onPreviousPageClick = () => {
  if (currentPage?.value) {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
    emits("page-click", currentPage.value);
  }
};

const onNextPageClick = () => {
  if (currentPage?.value) {
    if (currentPage.value < getTotalPageCount.value) {
      currentPage.value++;
    }
    emits("page-click", currentPage.value);
  }
};

const onPageClick = (page: number) => {
  if (currentPage?.value) {
    if (page > 0 && page <= getTotalPageCount.value) {
      currentPage.value = page;
    }
    emits("page-click", currentPage.value);
  }
};
</script>

<style scoped></style>
