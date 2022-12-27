<template>
  <PopupNotification :show="show">
    <template #icon>
      <ExclamationTriangleIcon
        class="w-10 h-10 p-2 rounded-full text-red-400 m-1 bg-red-100"
      />
    </template>
    <template #title>
      <span class="flex text-red-600 items-center antialiased">
        {{ startCase(title) }} !
      </span>
    </template>
    <template #description>
      <div class="text-xs text-zinc-500">
        {{ description }}
      </div>
    </template>
    <template #close-btn>
      <PlusIcon
        class="w-9 h-9 p-2 text-zinc-400 hover:text-zinc-600 transform rotate-45 cursor-pointer"
        @click="onCloseClick"
      />
    </template>
  </PopupNotification>
</template>

<script lang="ts" setup>
import PopupNotification from "./PopupNotification.vue";
import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/vue/24/outline";
import startCase from "lodash/startCase";

interface ErrorNotificationProps {
  show: boolean;
  title: string;
  description: string;
}

const props = defineProps<ErrorNotificationProps>();

const emits = defineEmits(["close-notification"]);

const onCloseClick = () => {
  emits("close-notification");
};
</script>

<style scoped></style>
