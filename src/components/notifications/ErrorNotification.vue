<template>
  <PopupNotification :show="show">
    <template #title>
      <ExclamationTriangleIcon class="w-6 h-6 text-red-400 m-1 bg-red-100" />
      <span>
        {{ title }}
      </span>
    </template>
    <template #description>
      {{ description }}
    </template>
  </PopupNotification>
</template>

<script lang="ts" setup>
import PopupNotification from "./PopupNotification.vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

interface ErrorNotificationProps {
  show: boolean;
  title: string;
  description: string;
}

defineProps<ErrorNotificationProps>();
</script>

<style scoped></style>
