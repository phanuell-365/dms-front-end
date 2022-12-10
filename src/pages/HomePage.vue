<template>
  <ApplicationLayout>
    <template #pages>
      <div>
        <StatsContainer />
      </div>
      <DashboardTablesContainer>
        <DashTableComponent href="received" table-name="received documents">
          <template #table>
            <DashboardTable
              :table-attributes="tableAttributes"
              :table-records="receivedDocumentsArray"
            >
            </DashboardTable>
          </template>
        </DashTableComponent>
      </DashboardTablesContainer>
    </template>
  </ApplicationLayout>
</template>

<script lang="ts" setup>
import ApplicationLayout from "../layouts/ApplicationLayout.vue";
import StatsContainer from "../components/home/stats/StatsContainer.vue";
import DashboardTablesContainer from "../components/home/tables/DashboardTablesContainer.vue";
import DashTableComponent from "../components/home/tables/DashTableComponent.vue";
import DashboardTable from "../components/home/tables/DashboardTable.vue";
import { ref, Ref } from "vue";
import moment from "moment";
import { ReceivedDocumentsObject } from "../stores/app/received/interfaces";

const receivedDocumentsArray: Ref<ReceivedDocumentsObject[]> = ref([
  {
    id: "RD001",
    title: "School Fee Payment",
    sender: "Nelson Gandhi",
    role: "Accounting",
    sentAt: moment().format("DD.MM.YYYY"),
    markStatus: "unread",
  },
  {
    id: "RD001",
    title: "School Fee Payment",
    sender: "Nelson Gandhi",
    role: "Accounting",
    sentAt: moment().format("DD.MM.YYYY"),
    markStatus: "read",
  },
  {
    id: "RD001",
    title: "School Fee Payment",
    sender: "Nelson Gandhi",
    role: "Accounting",
    sentAt: moment().format("DD.MM.YYYY"),
    markStatus: "unread",
  },
  {
    id: "RD001",
    title: "School Fee Payment",
    sender: "Nelson Gandhi",
    role: "Accounting",
    sentAt: moment().format("DD.MM.YYYY"),
    markStatus: "read",
  },
  {
    id: "RD001",
    title: "School Fee Payment",
    sender: "Nelson Gandhi",
    role: "Accounting",
    sentAt: moment().format("DD.MM.YYYY"),
    markStatus: "unread",
  },
]);

const tableAttributes: Ref<string[]> = ref(
  Object.keys(receivedDocumentsArray.value[0])
);
</script>

<style scoped></style>
