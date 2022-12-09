<template>
  <div
    class="flex md:flex-row flex-col md:flex-nowrap justify-evenly md:mx-0.5 mx-5 md:px-0.5 px-4"
  >
    <StatsItem>
      <StatBody title="users" />
      <StatFooter to="/users" />
    </StatsItem>

    <StatsItem>
      <StatBody title="documents">
        <template #icon>
          <DocumentDuplicateIcon
            class="w-12 h-12 text-white group-hover/stat:bg-emerald-700 bg-emerald-600 rounded-lg p-2 transition duration-100 delay-75 ease-in-out"
          />
        </template>
      </StatBody>
      <StatFooter to="/documents" />
    </StatsItem>

    <StatsItem>
      <StatBody title="sent">
        <template #icon>
          <PaperAirplaneIcon
            class="w-12 h-12 text-white group-hover/stat:bg-emerald-700 bg-emerald-600 rounded-lg p-2 transition duration-100 delay-75 ease-in-out"
          />
        </template>
      </StatBody>
      <StatFooter to="/sent" />
    </StatsItem>

    <StatsItem>
      <StatBody title="received">
        <template #icon>
          <InboxIcon
            class="w-12 h-12 text-white group-hover/stat:bg-emerald-700 bg-emerald-600 rounded-lg p-2 transition duration-100 delay-75 ease-in-out"
          />
        </template>
      </StatBody>
      <StatFooter to="/received" />
    </StatsItem>
  </div>
</template>

<script lang="ts" setup>
import StatFooter from "./StatFooter.vue";
import StatBody from "./StatBody.vue";
import StatsItem from "./StatsItem.vue";
import {
  DocumentDuplicateIcon,
  InboxIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/outline";
</script>

<style scoped></style>
