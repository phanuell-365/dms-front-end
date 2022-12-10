<template>
  <DashboardTableRowHeader
    :key="dashboardTableRowHeaderKey"
    :is-unread="isUnread"
  >
    {{ dashboardTableRowHeaderValue }}
  </DashboardTableRowHeader>
  <td v-for="(val, index) in values" :key="keys[index]" class="py-3 px-6">
    {{ val }}
  </td>
</template>

<script lang="ts" setup>
import DashboardTableRowHeader from "./DashboardTableRowHeader.vue";
import { Ref, ref } from "vue";

interface DashboardTableDataProps {
  tableObject: object;
  tableAttributes: string[];
}

const props = defineProps<DashboardTableDataProps>();

const newObject = ref(
  Object.assign(
    {},
    ...props.tableAttributes.map((value) => {
      // convert markStatus to status
      if (value === "markStatus") {
        const newVal = "status";

        return {
          // @ts-ignore
          [newVal]: props.tableObject[value],
        };
      } else {
        return {
          // @ts-ignore
          [value]: props.tableObject[value],
        };
      }
    })
  )
);

const values = ref(Object.values(newObject.value));
const keys = ref(Object.keys(newObject.value));

// get the name property of the object
const dashboardTableRowHeaderValue = ref(values.value.shift());
const dashboardTableRowHeaderKey = ref(keys.value.shift());

// is unread or read
const isUnread: Ref<boolean> = ref(
  values.value.some((value) => value === "unread")
);
</script>

<style scoped></style>
