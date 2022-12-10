<template>
  <div class="flex items-center justify-center md:h-[35rem]">
    <div
      class="flex md:flex-row flex-col flex-wrap items-center md:justify-start justify-center"
    >
      <div
        v-for="grid in 3"
        :key="grid"
        class="md:basis-1/2 px-4 p-1 md:first:mt-auto first:mt-5 md:my-auto my-3 last:mb-5 md:last:mb-auto border bg-white rounded-tl-lg rounded-bl-lg rounded-tr-lg rounded-br-lg"
      >
        <div class="flex flex-col m-1">
          <div class="flex justify-between">
            <DocumentPlusIcon
              class="w-12 h-12 m-2 bg-sky-50 text-sky-600 rounded-lg p-3 self-center"
            />
            <ArrowUpIcon
              class="w-7 h-7 transform rotate-45 text-zinc-400 mt-2"
            />
          </div>
          <div class="flex flex-col items-start justify-start">
            <div class="my-2 font-bold text-zinc-700 font-poppins-light">
              Create a document
            </div>
            <div class="my-1 text-sm text-zinc-500 hidden md:block">
              Upload document, define it's metadata and create a version history
              for the document.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowUpIcon, DocumentPlusIcon } from "@heroicons/vue/24/outline";
</script>

<style scoped></style>
