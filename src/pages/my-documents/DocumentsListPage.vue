<template>
  <div class="rounded-lg shadow-lg bg-white mt-5">
    <TableLayout :search-key="selectedSearchKey">
      <template #search-menu>
        <SearchMenuContainer :search-by="selectedSearchKey">
          <SearchMenuItem
            v-for="searchKey in searchKeys"
            :key="searchKey"
            :text="startCase(searchKey)"
            @search-key-click="onSearchKeyClick"
          />
        </SearchMenuContainer>
      </template>

      <template #search-input>
        <TableSearchInput
          v-model="query"
          :search-key="selectedSearchKey"
          @search-input-focus="onSearchInputFocus"
        />
      </template>

      <template #actions-menu>
        <ActionsContainer>
          <template #actions>
            <SearchMenuItem
              :text="computeSelectItemsMessage"
              @search-key-click="onSelectModeClick(computeSelectItemsMessage)"
            />
            <SearchMenuItem
              :text="computeSelectAllMessage"
              @search-key-click="onSelectAllClick(computeSelectAllMessage)"
            />
            <SearchMenuItem disabled text="Mark as Read" />
            <SearchMenuItem
              :disabled="disableSendAndDelete"
              :text="computeSendMessageText"
            />
            <SearchMenuItem
              :disabled="disableSendAndDelete"
              :text="computeDeleteMessageText"
            />
          </template>
        </ActionsContainer>
      </template>

      <template #table>
        <TableContainer @page-click="onPageClick">
          <TableHead>
            <TableHeader :headers="headers" @selection="onSelectionHandler" />
          </TableHead>
          <tbody>
            <TableRow :col-count="headers.length" :records="sortedRecords">
              <template #row="{ record }">
                <TableData :record="record" />
              </template>
            </TableRow>
          </tbody>
        </TableContainer>
      </template>
    </TableLayout>
  </div>
</template>

<script lang="ts" setup>
import { useRouterStore } from "../../stores/router";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import TableLayout from "../../layouts/TableLayout.vue";
import TableContainer from "../../components/tables/app-table-components/TableContainer.vue";
import TableHead from "../../components/tables/app-table-components/TableHead.vue";
import TableHeader from "../../components/tables/app-table-components/TableHeader.vue";
import { computed, provide, Ref, ref, watch } from "vue";
import TableRow from "../../components/tables/app-table-components/TableRow.vue";
import { ViewDocumentsObject } from "../../stores/app/documents/interfaces";
import moment from "moment";
import TableData from "../../components/tables/app-table-components/TableData.vue";
import SearchMenuContainer from "../../components/tables/search-components/SearchMenuContainer.vue";
import SearchMenuItem from "../../components/tables/search-components/SearchMenuItem.vue";
import ActionsContainer from "../../components/tables/actions-component/ActionsContainer.vue";
import TableSearchInput from "../../components/tables/TableSearchInput.vue";
import { useSelectionStore } from "../../stores/tables/selection";
import startCase from "lodash/startCase";
import camelCase from "lodash/camelCase";
import { useSearchResultsStore } from "../../stores/tables/results";
import { storeToRefs } from "pinia";
import { ITEMS_PER_PAGE } from "../../stores/tables/const";
import { currentPageKey } from "../../components/keys";
import { usePluralize } from "../../composables/pluralize";
import { useSortArrayStore } from "../../composables/sort-array";
import { useSortingStore } from "../../stores/tables/sorting";

const routerStore = useRouterStore();

const selectionStore = useSelectionStore();

const searchResultsStore = useSearchResultsStore();

const sortingStore = useSortingStore();

const sortArrayStore = useSortArrayStore();

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

const { getResults } = storeToRefs(searchResultsStore);

searchResultsStore.setUpTheStore(records, selectedSearchKey, query);

const onSearchKeyClick = (searchKey: string) => {
  selectedSearchKey.value = camelCase(searchKey);
};

// pagination

const currentPage = ref(1);

// put the records in the current page in a new array

const onPageClick = (page: number) => {
  currentPage.value = page;
};

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return getResults.value.slice(start, end);
});

// sort the paginated records

sortArrayStore.setUpArrayStore(paginatedRecords, headers.value[0], "asc");

watch(paginatedRecords, () => {
  // reset the sort when the paginated records change
  sortArrayStore.resetSort();

  // reset the sorting store when the paginated records change
  sortingStore.clearSortItems();

  sortArrayStore.setUpArrayStore(paginatedRecords, headers.value[0], "asc");
});

const { getSortedArray } = storeToRefs(sortArrayStore);

const sortedRecords = ref(getSortedArray);

// disable selecting send and delete when no records are selected

const disableSendAndDelete = computed(() => {
  return !selectionStore.getIsAnyItemSelected;
});

const onSelectModeClick = (selectItemMessage: string) => {
  if (selectItemMessage === "Select Items") {
    // set selection mode to true
    selectionStore.setSelectionMode(true);
  } else {
    // set selection mode to false
    selectionStore.setSelectionMode(false);

    // deselect all items
    selectionStore.deselectAllItems();
  }
};

const onSelectAllClick = (selectAllItems: string) => {
  if (selectAllItems === "Select all") {
    // check if we are in select mode, if not then toggle it
    if (!selectionStore.getSelectMode) {
      selectionStore.setSelectionMode(true);

      onSelectionHandler("select-all");
    } else {
      onSelectionHandler("select-all");
    }
  } else {
    onSelectionHandler("unselect-all");

    // then set select mode to false
    selectionStore.setSelectionMode(false);

    // then deselect all selected items
    selectionStore.deselectAllItems();
  }
};

const numberOfSelectedRecords = computed(() => {
  return selectionStore.getSelectedItemsCount;
});

const computeSelectItemsMessage = computed(() => {
  if (!selectionStore.getSelectMode) {
    return "Select Items";
  } else {
    return "Unselect Items";
  }
});

const computeSelectAllMessage = computed(() => {
  return selectionStore.getIsAllItemsSelected ? "Unselect all" : "Select all";
});

const computeSendMessageText = computed(() => {
  if (selectionStore.getIsAnyItemSelected) {
    return `Send (${numberOfSelectedRecords.value}) ${usePluralize(
      "item",
      numberOfSelectedRecords.value
    )}`;
  } else {
    return "Send";
  }
});

const computeDeleteMessageText = computed(() => {
  if (selectionStore.getIsAnyItemSelected) {
    return `Delete (${numberOfSelectedRecords.value}) ${usePluralize(
      "item",
      numberOfSelectedRecords.value
    )}`;
  } else {
    return "Delete";
  }
});

const onSearchInputFocus = () => {
  // reset the query if no query is entered or no item is selected
  if (!query.value || !selectionStore.getIsAnyItemSelected) {
    query.value = "";
  }

  // reset the current page to 1

  currentPage.value = 1;
};

const onSelectionHandler = (action: "select-all" | "unselect-all") => {
  // before selecting all items, check if the user has selected all items
  // if yes, unselect all items
  // if no, select all items
  if (action === "select-all") {
    // select all items
    // get all the ids of the records
    const ids: Ref<string[]> = ref([]);

    getResults.value.forEach((record) => {
      // @ts-ignore
      ids.value.push(record["id"]);
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

provide(currentPageKey, currentPage);

// @ts-ignore - This is a workaround for a bug in Vue Router 4.0.0-beta.13.
routerStore.setCurrentRoute(route?.name, route.path);

onBeforeRouteLeave((to, from, next) => {
  // on before route update, reset the current page to 1 and the query to an empty string
  // also reset the selection mode to false and deselect all items
  // also reset the selection store
  // also reset the search key to the first search key
  // also reset the search results store
  currentPage.value = 1;

  query.value = "";

  selectionStore.setSelectionMode(false);

  selectionStore.deselectAllItems();

  selectionStore.removeAllItems();

  // selectedSearchKey.value = searchKeys.value[0];
  //
  // searchResultsStore.reset();
  next();
});
</script>

<style scoped></style>
