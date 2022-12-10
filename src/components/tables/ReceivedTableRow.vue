<template>
  <template v-if="records?.length > 0 && hasValue">
    <tr
      v-for="record in records"
      :key="record?.id"
      :class="{
        'font-bold': record.markStatus === 'unread',
      }"
      class="group/table-row bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600"
      tabindex="0"
    >
      <slot :record="record" name="row" />
    </tr>
  </template>
  <template v-else>
    <tr>
      <td
        :colspan="colCount + 1"
        class="bg-white dark:bg-zinc-800 py-4 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600"
      >
        <span class="flex justify-center"> {{ comment }} </span>
      </td>
    </tr>
  </template>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface TableRowProps {
  records: object[];
  colCount: number;
  nullComment?: string;
}

const props = defineProps<TableRowProps>();

const hasValue = computed(() => {
  return props.records.some((value) => value);
});

const comment = computed(() =>
  props.nullComment ? props.nullComment : "No data to display"
);
</script>

<style scoped></style>
