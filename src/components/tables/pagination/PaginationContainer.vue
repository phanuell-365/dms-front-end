<template>
  <nav
    aria-label="Table navigation"
    class="flex justify-between items-center pt-4"
  >
    <span class="md:text-sm text-xs font-normal text-gray-500"
      >Showing
      <span class="font-semibold text-gray-900">
        {{ firstRow }} - {{ lastRow }}
      </span>
      of
      <span class="font-semibold text-gray-900">
        {{ totalRows }}
      </span></span
    >
    <div class="flex justify-between items-center space-x-2">
      <PaginationButton :disabled="currentPage === 1" :on-click="onFirstPage">
        <ChevronDoubleLeftIcon class="w-5 h-5" />
      </PaginationButton>

      <PaginationButton
        :disabled="currentPage === 1"
        :on-click="onPreviousPage"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
      </PaginationButton>

      <PaginationButton
        v-for="page in nextPages"
        :key="page"
        :active="currentPage === page"
        :on-click="() => onPageNumber(page)"
      >
        {{ page }}
      </PaginationButton>

      <PaginationButton
        :disabled="currentPage === totalPages || totalPages === 0"
        :on-click="onNextPage"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </PaginationButton>

      <PaginationButton
        :disabled="currentPage === totalPages || totalPages === 0"
        :on-click="onLastPage"
      >
        <ChevronDoubleRightIcon class="w-5 h-5" />
      </PaginationButton>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import PaginationButton from "./PaginationButton.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

interface PaginationContainerProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  totalPages: number;
}

const props = defineProps<PaginationContainerProps>();

const emits = defineEmits<{
  (event: "previous-page", ...args: any[]): void;
  (event: "next-page", ...args: any[]): void;
  (event: "page-number", pageNumber: number): void;
}>();

const onPreviousPage = () => {
  emits("previous-page");
};

const onNextPage = () => {
  emits("next-page");
};

const firstRow = computed(() => {
  return props.rowsPerPage * (props.currentPage - 1) + 1;
});

const lastRow = computed(() => {
  return Math.min(props.rowsPerPage * props.currentPage, props.totalRows);
});

const onPageNumber = (pageNumber: number) => {
  emits("page-number", pageNumber);
};

const onFirstPage = () => {
  emits("page-number", 1);
};

const onLastPage = () => {
  emits("page-number", props.totalPages);
};

const nextPages = computed(() => {
  const pages = [];
  for (let i = 0; i < 3; i++) {
    const page = props.currentPage + i;
    if (page <= props.totalPages) {
      pages.push(page);
    }
  }
  return pages;
});
</script>

<style scoped></style>
