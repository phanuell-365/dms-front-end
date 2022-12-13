<template>
  <div class="rounded-lg shadow-lg bg-white mt-5">
    <TableLayout :search-key="selectedSearchKey">
      <template #search-menu>
        <SearchMenuContainer :search-by="selectedSearchKey">
          <SearchMenuItem
            v-for="searchKey in searchKeys"
            :key="searchKey"
            :text="searchKey"
            @search-key-click="onSearchKeyClick"
          />
        </SearchMenuContainer>
      </template>

      <template #search-input>
        <TableSearchInput v-model="query" :search-key="selectedSearchKey" />
      </template>

      <template #actions-menu>
        <ActionsContainer>
          <template #actions>
            <SearchMenuItem disabled text="Mark as Read" />
            <SearchMenuItem :disabled="disableSendAndDelete" text="Send" />
            <SearchMenuItem :disabled="disableSendAndDelete" text="Delete" />
          </template>
        </ActionsContainer>
      </template>

      <template #table>
        <TableContainer>
          <TableHead>
            <TableHeader :headers="headers" @selection="onSelectionHandler" />
          </TableHead>
          <tbody>
            <TableRow :col-count="headers.length" :records="paginatedRecords">
              <template #row="{ record }">
                <TableData :record="record" />
              </template>
            </TableRow>
          </tbody>

          <template #pagination>
            <PaginationContainer
              :current-page="currentPage"
              :rows-per-page="recordsPerPage"
              :total-pages="totalPages"
              :total-rows="totalRecords"
              @previous-page="onPreviousPageClick"
              @next-page="onNextPageClick"
              @page-number="onPageClick"
            />
          </template>
        </TableContainer>
      </template>
    </TableLayout>
  </div>
</template>

<script lang="ts" setup>
import { useRouterStore } from "../../stores/router";
import { useRoute } from "vue-router";
import TableLayout from "../../layouts/TableLayout.vue";
import TableContainer from "../../components/tables/app-table-components/TableContainer.vue";
import TableHead from "../../components/tables/app-table-components/TableHead.vue";
import TableHeader from "../../components/tables/app-table-components/TableHeader.vue";
import { computed, Ref, ref } from "vue";
import TableRow from "../../components/tables/app-table-components/TableRow.vue";
import { ViewDocumentsObject } from "../../stores/app/documents/interfaces";
import moment from "moment";
import TableData from "../../components/tables/app-table-components/TableData.vue";
import SearchMenuContainer from "../../components/tables/search-components/SearchMenuContainer.vue";
import SearchMenuItem from "../../components/tables/search-components/SearchMenuItem.vue";
import ActionsContainer from "../../components/tables/actions-component/ActionsContainer.vue";
import TableSearchInput from "../../components/tables/TableSearchInput.vue";
import { useSearchTable } from "../../composables/search-table";
import { useSelectionStore } from "../../stores/tables/selection";
import PaginationContainer from "../../components/tables/pagination/PaginationContainer.vue";

const routerStore = useRouterStore();

const selectionStore = useSelectionStore();

const route = useRoute();

const records: Ref<ViewDocumentsObject[]> = ref([
  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
    type: "pdf",
  },

  {
    id: "VD02",
    title: "Report",
    creator: "Accounting",
    description: "This is a report addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["report", "accounting", "dean"],
    type: "docx",
  },
  {
    id: "VD03",
    title: "Letter of Intent",
    creator: "Computing",
    description: "A letter of intent addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["intent", "computing", "address"],
    type: "pptx",
  },

  {
    id: "VD04",
    title: "Application Letter",
    creator: "Mass media",
    description: "Application for admission",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["application", "letter", "dean", "mass media"],
    type: "pdf",
  },
  {
    id: "VD05",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
    type: "pdf",
  },

  {
    id: "VD06",
    title: "Report",
    creator: "Accounting",
    description: "This is a report addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["report", "accounting", "dean"],
    type: "docx",
  },
  {
    id: "VD07",
    title: "Letter of Intent",
    creator: "Computing",
    description: "A letter of intent addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["intent", "computing", "address"],
    type: "pptx",
  },

  {
    id: "VD08",
    title: "Application Letter",
    creator: "Mass media",
    description: "Application for admission",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["application", "letter", "dean", "mass media"],
    type: "pdf",
  },
  {
    id: "VD09",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
    type: "pdf",
  },

  {
    id: "VD10",
    title: "Report",
    creator: "Accounting",
    description: "This is a report addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["report", "accounting", "dean"],
    type: "docx",
  },
  {
    id: "VD11",
    title: "Letter of Intent",
    creator: "Computing",
    description: "A letter of intent addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["intent", "computing", "address"],
    type: "pptx",
  },

  {
    id: "VD12",
    title: "Application Letter",
    creator: "Mass media",
    description: "Application for admission",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["application", "letter", "dean", "mass media"],
    type: "pdf",
  },
  {
    id: "VD13",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
    type: "pdf",
  },

  {
    id: "VD14",
    title: "Report",
    creator: "Accounting",
    description: "This is a report addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["report", "accounting", "dean"],
    type: "docx",
  },
  {
    id: "VD15",
    title: "Letter of Intent",
    creator: "Computing",
    description: "A letter of intent addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["intent", "computing", "address"],
    type: "pptx",
  },

  {
    id: "VD16",
    title: "Application Letter",
    creator: "Mass media",
    description: "Application for admission",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["application", "letter", "dean", "mass media"],
    type: "pdf",
  },
  {
    id: "VD17",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
    type: "pdf",
  },

  {
    id: "VD18",
    title: "Report",
    creator: "Accounting",
    description: "This is a report addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["report", "accounting", "dean"],
    type: "docx",
  },
  {
    id: "VD19",
    title: "Letter of Intent",
    creator: "Computing",
    description: "A letter of intent addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["intent", "computing", "address"],
    type: "pptx",
  },

  {
    id: "VD20",
    title: "Application Letter",
    creator: "Mass media",
    description: "Application for admission",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["application", "letter", "dean", "mass media"],
    type: "pdf",
  },
  {
    id: "VD21",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
    type: "pdf",
  },

  {
    id: "VD22",
    title: "Report",
    creator: "Accounting",
    description: "This is a report addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["report", "accounting", "dean"],
    type: "docx",
  },
  {
    id: "VD23",
    title: "Letter of Intent",
    creator: "Computing",
    description: "A letter of intent addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["intent", "computing", "address"],
    type: "pptx",
  },

  {
    id: "VD24",
    title: "Application Letter",
    creator: "Mass media",
    description: "Application for admission",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["application", "letter", "dean", "mass media"],
    type: "pdf",
  },
  {
    id: "VD25",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
    type: "pdf",
  },
]);

const searchKeys = ref(["title", "creator", "description", "keywords", "type"]);

const selectedSearchKey = ref(searchKeys.value[0]);

const headers = ref(["title", "creator", "description", "creationDate"]);

// searching

const query = ref();

const searchedRecords = ref(useSearchTable(query, selectedSearchKey, records));

const onSearchKeyClick = (searchKey: string) => {
  selectedSearchKey.value = searchKey;
};

// pagination

const currentPage = ref(1);

const recordsPerPage = ref(6);

const totalRecords = computed(() => searchedRecords.value.length);

const totalPages = computed(() =>
  Math.ceil(totalRecords.value / recordsPerPage.value)
);

// put the records in the current page in a new array

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * recordsPerPage.value;
  const end = start + recordsPerPage.value;
  return searchedRecords.value.slice(start, end);
});

const onPreviousPageClick = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const onNextPageClick = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const onPageClick = (page: number) => {
  currentPage.value = page;
};

// disable selecting send and delete when no records are selected

const disableSendAndDelete = computed(() => {
  return selectionStore.getSelectedItemsCount === 0;
});

const onSelectionHandler = (action: "select-all" | "unselect-all") => {
  // before selecting all items, check if the user has selected all items
  // if yes, unselect all items
  // if no, select all items
  if (action === "select-all") {
    // select all items
    // get all the ids of the records
    const ids: Ref<string[]> = ref([]);

    records.value.forEach((record) => {
      ids.value.push(record.id);
    });

    // for every id, select the item
    ids.value.forEach((id) => {
      selectionStore.selectItem(id);
    });
  } else {
    // unselect all items
    selectionStore.deselectAllItems();
  }
};

// @ts-ignore - This is a workaround for a bug in Vue Router 4.0.0-beta.13.
routerStore.setCurrentRoute(route?.name, route.path);

// onBeforeRouteUpdate((to, from, next) => {
//   routerStore.setCurrentRoute(to.name, to.path);
//
//   next();
// });
</script>

<style scoped></style>
