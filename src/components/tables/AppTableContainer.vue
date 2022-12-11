<template>
  <div class="relative">
    <div class="flex justify-between items-center pb-4 p-4">
      <!--      <div class="relative">-->
      <!--        <span class="text-zinc-500 mx-2"> Search by </span>-->
      <!--        <select-->
      <!--          v-model="selectedKey"-->
      <!--          class="text-zinc-500 bg-white border border-zinc-300 focus:outline-none hover:bg-stone-100 focus:ring-4 focus:ring-zinc-200 font-medium rounded-lg text-sm px-3 py-1.5 w-32"-->
      <!--        >-->
      <!--          <option v-for="key in searchKeys" :key="key" :value="key">-->
      <!--            {{ startCase(key) }}-->
      <!--          </option>-->
      <!--        </select>-->
      <!--      </div>-->
      <div>
        <SearchMenuContainer :search-by="selectedSearchKey">
          <SearchMenuItem
            v-for="searchKey in searchKeys"
            :key="searchKey"
            :text="searchKey"
            @search-key-click="onSearchKeyClick"
          />
        </SearchMenuContainer>
      </div>
      <label class="sr-only" for="table-search">Search</label>
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-zinc-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          id="table-search"
          v-model="query"
          :placeholder="searchInputPlaceholder"
          autocomplete="off"
          class="block p-2 pl-10 w-80 text-sm text-zinc-900 bg-white rounded-lg border border-zinc-300 focus:ring-sky-500 focus:border-sky-500"
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchMenuContainer from "./search-components/SearchMenuContainer.vue";
import SearchMenuItem from "./search-components/SearchMenuItem.vue";
import { computed, ref } from "vue";

interface AppTableContainerProps {
  searchKeys: string[];
}

const props = defineProps<AppTableContainerProps>();

const selectedSearchKey = ref(props.searchKeys[0]);

const onSearchKeyClick = (searchKey: string) => {
  selectedSearchKey.value = searchKey;
};

const searchInputPlaceholder = computed(
  () => `Search for items by ${selectedSearchKey.value}`
);
</script>

<style scoped></style>
