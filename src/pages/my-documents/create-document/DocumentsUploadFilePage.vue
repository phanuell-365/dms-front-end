<template>
  <h1>
    <span class="text-2xl font-bold">
      Successfully uploaded the file {{ fileId }}.
    </span>
  </h1>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouterStore } from "../../../stores/router";
import { useRoute } from "vue-router";

interface DocumentsUploadFilePageProps {
  fileId: string;
}

const props = defineProps<DocumentsUploadFilePageProps>();

const fileId = ref(props.fileId);

const routerStore = useRouterStore();

const route = useRoute();

// @ts-ignore
routerStore.setCurrentRoute(route?.name, route.path);
</script>

<style scoped></style>
