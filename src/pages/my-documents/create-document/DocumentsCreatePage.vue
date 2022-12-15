<template>
  <div>
    No documents selected yet, please and drag and drop your documents to the
    drop zone to upload them and add them to the document list.
  </div>
</template>

<script lang="ts" setup>
import { useFileUploadStore } from "../../../stores/app/files/file-upload";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRouterStore } from "../../../stores/router";

const fileUploadStore = useFileUploadStore();

const { getUploadedFiles } = storeToRefs(fileUploadStore);

const router = useRouter();

fileUploadStore.$subscribe((state) => {
  if (getUploadedFiles.value.length > 0) {
    router.push({
      name: "upload-document-files",
      params: {
        id: getUploadedFiles.value[0].fileId,
      },
    });
  }
});

onBeforeRouteUpdate((to, from, next) => {
  if (getUploadedFiles.value.length > 0) {
    router.push({
      name: "upload-document-files",
      params: {
        id: getUploadedFiles.value[0].fileId,
      },
    });
  }

  next();
});

const routerStore = useRouterStore();

const route = useRoute();

// @ts-ignore
routerStore.setCurrentRoute(route?.name, route.path);
</script>

<style scoped></style>
