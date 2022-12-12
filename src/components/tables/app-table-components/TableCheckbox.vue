<template>
  <td class="py-4 px-3">
    <div class="flex items-center justify-center">
      <input
        id="tableRow"
        :value="value"
        class="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300 focus:ring-emerald-500 focus:ring-2"
        name="tableRow"
        type="checkbox"
        @click="onCheckboxClick"
      />
      <label class="sr-only" for="tableRow">checkbox</label>
    </div>
  </td>
</template>

<script lang="ts" setup>
interface TableCheckboxProps {
  value: string;
}

defineProps<TableCheckboxProps>();

const emits = defineEmits<{
  (e: "checkbox-click", value: HTMLInputElement): void;
}>();

const onCheckboxClick = (event: Event) => {
  emits("checkbox-click", event.target as HTMLInputElement);
};
</script>

<style scoped></style>
