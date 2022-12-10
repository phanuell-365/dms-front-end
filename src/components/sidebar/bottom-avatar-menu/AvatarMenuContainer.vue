<template>
  <Menu v-slot="{ open }" as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center px-4 py-2 focus:outline-none focus-visible:ring-0"
      >
        {{ startCase(username) }}
        <ChevronRightIcon
          :class="{
            '-rotate-90 transform transition delay-100 duration-75 ease-in-out':
              open,
          }"
          aria-hidden="true"
          class="ml-2 -mr-1 h-4 w-4 text-emerald-200 hover:text-emerald-100"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute -inset-x-10 bottom-10 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-md bg-emerald-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <AvatarMenuItem text="view profile">
            <template #icon="{ active }">
              <UserIcon
                :active="active"
                aria-hidden="true"
                class="h-5 w-5 text-emerald-400 group-hover:text-emerald-200"
              />
            </template>
          </AvatarMenuItem>

          <AvatarMenuItem text="view received">
            <template #icon="{ active }">
              <InboxArrowDownIcon
                :active="active"
                aria-hidden="true"
                class="h-5 w-5 text-emerald-400 group-hover:text-emerald-200"
              />
            </template>
          </AvatarMenuItem>

          <AvatarMenuItem text="view sent">
            <template #icon="{ active }">
              <PaperAirplaneIcon
                :active="active"
                aria-hidden="true"
                class="h-5 w-5 text-emerald-400 transition transform -rotate-45 group-hover:text-emerald-200"
              />
            </template>
          </AvatarMenuItem>

          <AvatarMenuItem text="view document">
            <template #icon="{ active }">
              <DocumentDuplicateIcon
                :active="active"
                aria-hidden="true"
                class="h-5 w-5 text-emerald-400 group-hover:text-emerald-200"
              />
            </template>
          </AvatarMenuItem>

          <AvatarMenuItem text="logout">
            <template #icon>
              <svg
                class="h-5 w-5 text-emerald-400 group-hover:text-emerald-200"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
          </AvatarMenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import {
  ChevronRightIcon,
  DocumentDuplicateIcon,
  InboxArrowDownIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import startCase from "lodash/startCase";
import AvatarMenuItem from "./AvatarMenuItem.vue";

interface AvatarMenuContainerProps {
  username: string;
}

defineProps<AvatarMenuContainerProps>();
</script>

<style scoped></style>
