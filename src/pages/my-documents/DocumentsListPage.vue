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
            <SearchMenuItem text="Send" />
            <SearchMenuItem text="Delete" />
          </template>
        </ActionsContainer>
      </template>

      <template #table>
        <TableContainer>
          <TableHead>
            <TableHeader :headers="headers" @selection="onSelectionHandler" />
          </TableHead>
          <tbody>
            <TableRow :col-count="headers.length" :records="searchedRecords">
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
import { useRoute } from "vue-router";
import TableLayout from "../../layouts/TableLayout.vue";
import TableContainer from "../../components/tables/app-table-components/TableContainer.vue";
import TableHead from "../../components/tables/app-table-components/TableHead.vue";
import TableHeader from "../../components/tables/app-table-components/TableHeader.vue";
import { Ref, ref } from "vue";
import TableRow from "../../components/tables/app-table-components/TableRow.vue";
import { ViewDocumentsObject } from "../../stores/app/documents/interfaces";
import moment from "moment";
import TableData from "../../components/tables/app-table-components/TableData.vue";
import SearchMenuContainer from "../../components/tables/search-components/SearchMenuContainer.vue";
import SearchMenuItem from "../../components/tables/search-components/SearchMenuItem.vue";
import ActionsContainer from "../../components/tables/actions-component/ActionsContainer.vue";
import TableSearchInput from "../../components/tables/TableSearchInput.vue";
import { useSearchTable } from "../../composables/search-table";
import { useSelectionStore } from "../../stores/app/documents/selection";

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
]);

const searchKeys = ref(["title", "creator", "description", "keywords", "type"]);

const selectedSearchKey = ref(searchKeys.value[0]);

const headers = ref(["title", "creator", "description", "creationDate"]);

const onSearchKeyClick = (searchKey: string) => {
  selectedSearchKey.value = searchKey;
};

const query = ref();

const searchedRecords = ref(useSearchTable(query, selectedSearchKey, records));

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
