<template>
  <TableCheckbox :value="recordId" />
  <TableRowHeader :key="tableRowHeaderKey"
    >{{ tableRowHeaderValue }}
  </TableRowHeader>
  <td
    v-for="(value, index) in values"
    :key="keys[index]"
    class="md:py-4 md:px-3"
  >
    <!--  if the description is being rendered, render it inside a ResponsiveTableData, else render the data  -->
    <ResponsiveTableData v-if="keys[index] === 'description'" :data="value" />
    <span v-else>
      {{ value }}
    </span>
  </td>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TableRowHeader from "./TableRowHeader.vue";
import TableCheckbox from "./TableCheckbox.vue";
import ResponsiveTableData from "./ResponsiveTableData.vue";
import {
  useGetKeyAndValue,
  useRemoveKeysFromObject,
} from "../../../composables";

interface TableDataProps {
  record: object;
}

const props = defineProps<TableDataProps>();

const recordId = useGetKeyAndValue("id", props.record).value as string;

const newRecord = ref(
  useRemoveKeysFromObject(["id", "keywords", "type"], props.record)
);

const values = ref(Object.values(newRecord.value));
const keys = ref(Object.keys(newRecord.value));

// save the heading of the table row
const tableRowHeaderValue = ref(values.value.shift());
const tableRowHeaderKey = ref(keys.value.shift());
</script>

<style scoped></style>
