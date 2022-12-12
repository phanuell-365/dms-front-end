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
            <TableRow :col-count="headers.length" :records="records">
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
import { Ref, ref, watch } from "vue";
import TableRow from "../../components/tables/app-table-components/TableRow.vue";
import { ViewDocumentsObject } from "../../stores/app/documents/interfaces";
import moment from "moment";
import TableData from "../../components/tables/app-table-components/TableData.vue";
import SearchMenuContainer from "../../components/tables/search-components/SearchMenuContainer.vue";
import SearchMenuItem from "../../components/tables/search-components/SearchMenuItem.vue";
import ActionsContainer from "../../components/tables/actions-component/ActionsContainer.vue";
import TableSearchInput from "../../components/tables/TableSearchInput.vue";

const routerStore = useRouterStore();

const route = useRoute();

const searchKeys = ref(["title", "creator", "description", "keywords", "type"]);

const selectedSearchKey = ref(searchKeys.value[0]);

const onSearchKeyClick = (searchKey: string) => {
  selectedSearchKey.value = searchKey;
};

const query = ref();

watch(query, console.error);

const records: Ref<ViewDocumentsObject[]> = ref([
  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
  },

  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
  },
  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
  },

  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
    keywords: ["memo", "internal", "dean"],
  },
]);

const headers = ref(["title", "creator", "description", "creationDate"]);

const onSelectionHandler = (action: "select-all" | "unselect-all") => {
  console.log(action);
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
