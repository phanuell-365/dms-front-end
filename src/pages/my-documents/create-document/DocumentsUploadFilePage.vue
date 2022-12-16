<template>
  <h1>
    <span class="text-2xl font-bold">
      Successfully uploaded the file {{ uploadedFile?.fullName }}.
    </span>
  </h1>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouterStore } from "../../../stores/router";
import { useRoute } from "vue-router";
import { useFileUploadStore } from "../../../stores/app/files/file-upload";

interface DocumentsUploadFilePageProps {
  fileId: string;
}

const props = defineProps<DocumentsUploadFilePageProps>();

watch(props, (value) => {
  fileId.value = value.fileId;
  uploadedFile.value = fileUploadStore.getUploadedFileById(value.fileId).value;
});

const fileId = ref(props.fileId);

const routerStore = useRouterStore();

const fileUploadStore = useFileUploadStore();

const uploadedFile = ref(
  fileUploadStore.getUploadedFileById(fileId.value).value
);

const route = useRoute();

// @ts-ignore
routerStore.setCurrentRoute(route?.name, route.path);
</script>

<style scoped></style>
