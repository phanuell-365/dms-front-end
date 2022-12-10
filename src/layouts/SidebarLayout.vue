<template>
  <div class="relative h-full">
    <div class="py-2 my-5">
      <RouterLink
        class="font-bold text-emerald-200 flex flex-row flex-nowrap items-center justify-evenly"
        to="/"
      >
        <div class="basis-1/3">
          <DocumentIcon class="w-10 h-10" />
        </div>
        <div class="flex flex-row items-center basis-2/3">
          <span class="mx-1">Electro</span>
          <span class="mx-1">DMS</span>
        </div>
      </RouterLink>
    </div>

    <div class="py-2">
      <SidebarItem text="home" to="/">
        <template #icon>
          <HomeIcon
            class="w-6 h-6 text-emerald-200 inline-block group-hover:text-emerald-400"
          />
        </template>
      </SidebarItem>
      <SidebarItem text="users" to="/users">
        <template #icon>
          <UserGroupIcon
            class="w-6 h-6 text-emerald-200 inline-block group-hover:text-emerald-400"
          />
        </template>
      </SidebarItem>
      <SidebarItem text="documents" to="/documents">
        <template #icon>
          <DocumentDuplicateIcon
            class="w-6 h-6 text-emerald-200 inline-block group-hover:text-emerald-400"
          />
        </template>
      </SidebarItem>
      <SidebarItem text="sent" to="/sent">
        <template #icon>
          <PaperAirplaneIcon
            class="w-6 h-6 text-emerald-200 inline-block group-hover:text-emerald-400 transition transform -rotate-45"
          />
        </template>
      </SidebarItem>
      <SidebarItem text="received" to="/received">
        <template #icon>
          <InboxIcon
            class="w-6 h-6 text-emerald-200 inline-block group-hover:text-emerald-400"
          />
        </template>
      </SidebarItem>
      <SidebarItem text="version control" to="/versions">
        <template #icon>
          <AdjustmentsVerticalIcon
            class="w-6 h-6 text-emerald-200 inline-block group-hover:text-emerald-400"
          />
        </template>
      </SidebarItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  AdjustmentsVerticalIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  HomeIcon,
  InboxIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
import SidebarItem from "../components/sidebar/SidebarItem.vue";
</script>

<style scoped></style>
