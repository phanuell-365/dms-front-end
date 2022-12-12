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

interface TableDataProps {
  record: object;
}

const props = defineProps<TableDataProps>();

const values = ref(Object.values(props.record));
const keys = ref(Object.keys(props.record));

// remove the id
const recordId = ref(values.value.shift() as string);
keys.value.shift();

// save the heading of the table row
const tableRowHeaderValue = ref(values.value.shift());
const tableRowHeaderKey = ref(keys.value.shift());
</script>

<style scoped></style>
