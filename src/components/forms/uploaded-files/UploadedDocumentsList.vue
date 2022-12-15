<template>
  <div class="flex flex-col mt-0.5 mb-2 mx-0.5 p-1 w-72">
    <UploadedFileItem
      v-for="file in uploadedFiles"
      :key="file.fileId"
      :uploaded-file="file"
    />
  </div>
</template>

<script lang="ts" setup>
import { useFileUploadStore } from "../../../stores/app/files/file-upload";
import { computed } from "vue";
import UploadedFileItem from "./UploadedFileItem.vue";

const fileUploadStore = useFileUploadStore();

const uploadedFiles = computed(() => fileUploadStore.uploadedFiles);
</script>

<style scoped></style>
