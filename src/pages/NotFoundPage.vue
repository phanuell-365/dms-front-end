<template>
  <div
    class="h-screen mx-auto flex flex-col justify-evenly items-center bg-zinc-50 dark:bg-zinc-600"
  >
    <div class="mt-4 flex flex-col items-center basis-3/4">
      <DocumentIcon class="h-12 w-12 mb-14 text-emerald-600" />
      <h1 class="text-3xl font-bold text-emerald-600">404</h1>
      <h1 class="my-5 text-6xl font-bold text-stone-700">Page not found.</h1>
      <p class="text-lg text-stone-400 dark:text-stone-50 my-3">
        The page
        <span class="text-emerald-600 cursor-pointer">"{{ route.path }}"</span>
        you are looking for does not exist.
      </p>
      <p class="text-lg text-stone-400 dark:text-stone-50 my-4">
        You may have mistyped the address or the page may have moved.
      </p>
      <div class="flex justify-center items-center mt-10">
        <RouterLink
          class="group flex flex-row flex-nowrap items-center text-lg text-stone-400"
          to="/"
        >
          <span class="group-hover:text-emerald-600">
            Go back to home page
          </span>
          <span>
            <ArrowRightIcon
              class="w-7 h-5 group-hover:text-emerald-600 transition delay-75 duration-100 group-hover:translate-x-1"
            />
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRightIcon, DocumentIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped></style>
