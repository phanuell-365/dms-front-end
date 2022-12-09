<template>
  <div class="flex absolute inset-x-0 bottom-0 p-3 border-t border-emerald-700">
    <div class="flex flex-row flex-nowrap items-center justify-evenly">
      <div class="basis-1/4">
        <UserCircleIcon
          class="w-10 h-10 text-emerald-200 inline-block group-hover:text-emerald-400"
        />
      </div>
      <div class="flex flex-col basis-3/4 flex-nowrap text-xs">
        <span class="mx-1 px-2 text-emerald-50 font-bold">
          <AvatarMenuContainer username="administrator" />
        </span>
        <span
          class="mx-1 px-2 text-emerald-50 role inline-flex justify-center px-4"
          >admin</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserCircleIcon } from "@heroicons/vue/24/outline";
import AvatarMenuContainer from "./bottom-avatar-menu/AvatarMenuContainer.vue";
</script>

<style scoped></style>
