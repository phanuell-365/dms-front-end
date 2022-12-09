<template>
  <button
    class="px-4 py-1.5 flex items-baseline justify-between text-emerald-600 rounded-lg border border-zinc-200 hover:text-emerald-50 hover:bg-emerald-600 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 transition ease-in-out delay-100 transform hover:-translate-y-0.5 duration-100"
    @click="onClickHandler"
  >
    <span class="pr-1">
      <svg
        class="w-6 h-6 inline-block"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></path>
      </svg>
    </span>
    <span class="text-sm font-semibold"> New Document </span>
  </button>
</template>

<script lang="ts" setup>
const emits = defineEmits(["click"]);

const onClickHandler = async () => {
  emits("click");
};
</script>

<style scoped></style>
