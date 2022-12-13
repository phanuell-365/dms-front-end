<template>
  <Menu v-slot="{ open }" as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full text-sm items-center justify-center px-4 py-2 rounded bg-gray-300 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Search by {{ searchBy }}
        <ChevronDownIcon
          :class="{
            '-rotate-180 transform transition delay-100 duration-75 ease-in-out':
              open,
          }"
          aria-hidden="true"
          class="ml-2 -mr-1 h-4 w-4 text-zinc-700 hover:text-zinc-500"
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
        class="absolute right-0 z-20 mt-2 w-36 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <slot />
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

interface SearchMenuContainerProps {
  searchBy: string;
}

defineProps<SearchMenuContainerProps>();
</script>

<style scoped></style>
