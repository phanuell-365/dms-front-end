<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog class="relative z-50" static @close="setIsOpen">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogBackdrop />
      </TransitionChild>

      <TransitionChild
        enter="duration-100 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-80 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div class="absolute top-0 right-0 h-16 w-16">
          <DialogPanel
            class="w-full max-w-sm md:max-w-md rounded-lg shadow-lg bg-white px-7 py-5 m-5"
          >
            <DialogTitle class="my-3 text-2xl font-bold flex flex-row">
              <slot name="title" />
            </DialogTitle>
            <DialogDescription class="flex items-center justify-center">
              <slot name="description" />
            </DialogDescription>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ref, watch } from "vue";
import DialogBackdrop from "../DialogBackdrop.vue";

interface PopupNotificationProps {
  show: boolean;
}

const props = defineProps<PopupNotificationProps>();

watch(props, (value) => {
  isOpen.value = value.show;
});

const isOpen = ref(props.show);

const setIsOpen = (value: boolean) => {
  isOpen.value = value;
};
</script>

<style scoped></style>
