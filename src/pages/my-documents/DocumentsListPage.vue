<template>
  <div class="rounded-lg shadow-lg bg-white mt-5">
    <AppTableContainer
      :search-keys="['title', 'creator', 'description', 'keywords', 'type']"
    >
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
    </AppTableContainer>
  </div>
</template>

<script lang="ts" setup>
import { useRouterStore } from "../../stores/router";
import { useRoute } from "vue-router";
import AppTableContainer from "../../components/tables/AppTableContainer.vue";
import TableContainer from "../../components/tables/app-table-components/TableContainer.vue";
import TableHead from "../../components/tables/app-table-components/TableHead.vue";
import TableHeader from "../../components/tables/app-table-components/TableHeader.vue";
import { Ref, ref } from "vue";
import TableRow from "../../components/tables/app-table-components/TableRow.vue";
import { ViewDocumentsObject } from "../../stores/app/documents/interfaces";
import moment from "moment";
import TableData from "../../components/tables/app-table-components/TableData.vue";

const routerStore = useRouterStore();

const route = useRoute();

const records: Ref<ViewDocumentsObject[]> = ref([
  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
  },

  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
  },
  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
  },

  {
    id: "VD01",
    title: "Internal Memo",
    creator: "Registrar",
    description: "This is an internal memo addressing the dean of students",
    creationDate: moment().format("DD.MM.YYYY"),
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
