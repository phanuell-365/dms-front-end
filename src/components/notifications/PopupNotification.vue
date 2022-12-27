<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog class="relative z-50" static @close="setIsOpen">
      <TransitionChild
        v-if="fatal"
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
        enter-from="opacity-0 translate-x-5"
        enter-to="opacity-100 scale-100"
        leave="duration-80 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <!--        <div class="relative">-->
        <!--        <div class="absolute top-0 right-0 h-16 w-16">-->
        <div class="fixed inset-0 flex items-start justify-end p-1">
          <DialogPanel
            class="w-full max-w-sm md:max-w-md rounded-md shadow-lg bg-white p-3 mt-5 mb-3 mx-3"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
          >
            <div class="flex flex-row">
              <div class="basis-2/12">
                <slot name="icon" />
              </div>
              <DialogDescription
                class="basis-9/12 flex flex-col items-start justify-center p-1"
              >
                <DialogTitle class="mb-1">
                  <slot name="title" />
                </DialogTitle>
                <slot name="description" />
              </DialogDescription>
              <div class="basis-1/12">
                <slot name="close-btn" />
              </div>
            </div>
          </DialogPanel>
          <!--          </div>-->
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
  fatal?: boolean;
}

const props = defineProps<PopupNotificationProps>();

watch(props, (value) => {
  isOpen.value = value.show;
  if (!value.show) emits("close-notification");
});

const isOpen = ref(props.show);

const setIsOpen = (value: boolean) => {
  isOpen.value = value;
  emits("close-notification");
};

const onMouseEnter = () => {
  console.error("mouseenter");
  emits("hover", true);
};

const onMouseLeave = () => {
  console.error("mouseleave");
  emits("hover", false);
};

const emits = defineEmits<{
  (e: "hover", state: boolean): void;
  (e: "close-notification"): void;
}>();
</script>

<style scoped></style>
