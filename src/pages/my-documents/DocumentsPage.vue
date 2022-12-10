<template>
  <div class="flex items-center justify-center md:h-[35rem]">
    <div
      class="flex md:flex-row flex-col flex-wrap items-center md:justify-start justify-center"
    >
      <GridItem
        :description="gridListData[0].description"
        :title="gridListData[0].title"
        class="md:rounded-none md:rounded-tl-lg rounded-lg"
        color="sky"
        to="/documents/create"
      />

      <GridItem
        :description="gridListData[1].description"
        :title="gridListData[1].title"
        class="md:rounded-none md:rounded-tr-lg rounded-lg"
        color="violet"
        to="/documents/list"
      >
        <template #icon>
          <DocumentTextIcon
            class="w-12 h-12 m-2 bg-violet-50 group-hover/grid:bg-violet-100 text-violet-600 rounded-lg p-3 self-center"
          />
        </template>
      </GridItem>

      <GridItem
        :description="gridListData[2].description"
        :title="gridListData[2].title"
        class="md:rounded-none md:rounded-bl-lg rounded-lg"
        color="pink"
        to="/documents/send"
      >
        <template #icon>
          <PaperAirplaneIcon
            class="w-12 h-12 m-2 bg-pink-50 group-hover/grid:bg-pink-100 text-pink-600 rounded-lg p-3 self-center"
          />
        </template>
      </GridItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DocumentTextIcon, PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import GridItem from "../../components/documents/GridItem.vue";
import { Ref, ref } from "vue";
import { useRouterStore } from "../../stores/router";
import { useRoute } from "vue-router";

interface GridListItem {
  title: string;
  description: string;
}

const gridListData: Ref<GridListItem[]> = ref([
  {
    title: "Create a document",
    description:
      "Upload document, define it's metadata and create a version history for the document.",
  },
  {
    title: "View documents list",
    description:
      "View and search through the list of all your sent, received and uploaded documents.",
  },
  {
    title: "Send a document",
    description:
      "Attach a title and a description to a document or a list of documents to be sent to a variety of users.",
  },
]);

const routerStore = useRouterStore();

const route = useRoute();

routerStore.setCurrentRoute(route?.name, route.path);

// onBeforeRouteUpdate((to, from, next) => {
//   routerStore.setCurrentRoute(to.name, to.path);
//
//   next();
// });
</script>

<style scoped></style>
