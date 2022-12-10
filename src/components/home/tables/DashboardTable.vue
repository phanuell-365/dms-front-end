<template>
  <table class="w-full text-3xs text-left text-zinc-500">
    <thead class="text-2xs font-poppins-light text-zinc-800 bg-gray-100">
      <tr>
        <th
          v-for="attribute in headerAttributes"
          :key="attribute"
          class="py-1.5 px-3"
          scope="col"
        >
          {{ startCase(attribute) }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="record in tableRecords"
        :key="record.id"
        :class="{
          'font-bold': record.markStatus === 'unread',
        }"
        class="bg-white border-b"
      >
        <DashboardTableData
          :table-attributes="attributes"
          :table-object="record"
        />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import DashboardTableData from "./DashboardTableData.vue";
import { startCase } from "lodash";

interface DashboardTableProps {
  tableAttributes: string[];
  tableRecords: object[];
}

const props = defineProps<DashboardTableProps>();

const attributes = [...props.tableAttributes]
  // .map((value) => (value === "markStatus" ? "status" : value))
  .filter((value) => value !== "id");

const headerAttributes = [...props.tableAttributes]
  .map((value) => (value === "markStatus" ? "status" : value))
  .filter((value) => value !== "id");
</script>

<style scoped></style>
