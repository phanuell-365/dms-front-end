<template>
  <RouterLink
    :to="href"
    class="bg-white first:border-t border-b last:mb-2 border-x"
  >
    <div class="flex flex-row py-1 px-1">
      <div class="basis-1/4 flex items-center justify-center">
        <div class="flex flex-row flex-nowrap items-center justify-start">
          <span :class="uploadedFile.fileTextColor" class="flex items center">
            <DocumentTextIcon class="w-8 h-8 m-1" />
          </span>
        </div>
      </div>

      <div class="flex flex-row flex-grow my-1 mx-0.5 p-0.5">
        <div class="flex flex-col items-start">
          <div class="text-xs font-medium m-0.5 text-gray-800">
            {{ uploadedFile.name }}
          </div>
          <span class="text-2xs text-gray-500 m-0.5">
            {{ fileSize }}
          </span>
        </div>
      </div>

      <div class="flex items-start m-0.5 p-0.5">
        <button class="flex flex-row flex-nowrap justify-end">
          <span class="flex items-center">
            <svg
              class="w-4 h-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { UploadFile } from "../../../stores/app/files/upload-file";
import { computed } from "vue";
import { DocumentTextIcon } from "@heroicons/vue/24/outline";

interface UploadedFileProps {
  uploadedFile: UploadFile;
}

const props = defineProps<UploadedFileProps>();

const uploadedFile = computed(() => props.uploadedFile);

const fileSize = computed(() => {
  const size = props.uploadedFile.size;
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }
});

const href = computed(
  () => `/documents/create/files/${props.uploadedFile.fileId}`
);
</script>

<style scoped></style>
