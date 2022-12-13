<template>
  <button
    :class="{
      'cursor-not-allowed': disabled,
      'bg-gray-100': active,
    }"
    :disabled="disabled"
    class="flex items-center justify-center md:w-8 w-6 md:h-8 h-6 md:text-sm text-xs font-medium text-stone-700 bg-white border border-gray-300 md:rounded-md rounded hover:bg-gray-50"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface PaginationButtonProps {
  disabled?: boolean;
  onClick: () => void;
  active?: boolean;
}

const props = defineProps<PaginationButtonProps>();

const disabled = computed(() => props.disabled);

const onClick = () => {
  if (!disabled.value) {
    props.onClick();
  }
};

const active = computed(() => props.active);
</script>

<style scoped></style>
