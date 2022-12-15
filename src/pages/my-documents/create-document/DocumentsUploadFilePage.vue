<template>
  <h1>
    <span class="text-2xl font-bold">
      Successfully uploaded the file {{ fileId }}.
    </span>
  </h1>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface DocumentsUploadFilePageProps {
  fileId: string;
}

const props = defineProps<DocumentsUploadFilePageProps>();

const fileId = ref(props.fileId);
</script>

<style scoped></style>
