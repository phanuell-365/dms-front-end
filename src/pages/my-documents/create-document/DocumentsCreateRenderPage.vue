<template>
  <FormLayout>
    <template #left>
      <RouterView />
    </template>
    <template #right>
      <div class="flex flex-col mx-auto">
        <div class="basis-5/12">
          <FormFileUpload />
        </div>
        <div v-if="getHasFile" class="basis-1/12">
          <div class="flex flex-col">
            <span class="text-sm font-bold text-zinc-500 mt-2.5 mb-1">
              Uploaded Files
            </span>
          </div>
        </div>
        <div class="basis-6/12">
          <UploadedDocumentsList />
        </div>
      </div>
    </template>
  </FormLayout>
</template>

<script lang="ts" setup>
import { useRouterStore } from "../../../stores/router";
import { useRoute } from "vue-router";
import FormLayout from "../../../layouts/FormLayout.vue";
import FormFileUpload from "../../../components/forms/FormFileUpload.vue";
import UploadedDocumentsList from "../../../components/forms/uploaded-files/UploadedDocumentsList.vue";
import { useFileUploadStore } from "../../../stores/app/files/file-upload";
import { storeToRefs } from "pinia";

const routerStore = useRouterStore();

const route = useRoute();

const fileUploadStore = useFileUploadStore();

const { getHasFile } = storeToRefs(fileUploadStore);

// @ts-ignore
routerStore.setCurrentRoute(route?.name, route.path);

// onBeforeRouteUpdate((to, from, next) => {
//   routerStore.setCurrentRoute(to.name, to.path);
//
//   next();
// });
</script>

<style scoped></style>
