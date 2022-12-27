<template>
  <CreateMetadata :file-id="fileId" />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouterStore } from "../../../stores/router";
import { useRoute } from "vue-router";
import { useFileUploadStore } from "../../../stores/app/files/file-upload";
import CreateMetadata from "../../../components/forms/metadata/CreateMetadata.vue";
import { storeToRefs } from "pinia";

interface DocumentsUploadFilePageProps {
  fileId: string;
}

const props = defineProps<DocumentsUploadFilePageProps>();

const routerStore = useRouterStore();

const fileUploadStore = useFileUploadStore();

const { getUploadedFileById } = storeToRefs(fileUploadStore);

watch(props, (value) => {
  fileId.value = value.fileId;
  uploadedFile.value = getUploadedFileById.value(value.fileId);
});

const fileId = ref(props.fileId);

const uploadedFile = ref(getUploadedFileById.value(fileId.value));

const route = useRoute();

// @ts-ignore
routerStore.setCurrentRoute(route?.name, route.path);
</script>

<style scoped></style>
