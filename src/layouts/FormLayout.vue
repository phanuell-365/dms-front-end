<template>
  <form autocomplete="off" class="bg-white" novalidate @submit.prevent>
    <div
      class="flex md:flex-row flex-col flex-nowrap justify-evenly md:mx-0.5 px-4 md:px-0.5 mx-5"
    >
      <div class="basis-2/3 overflow-y-auto h-[34rem] ml-2 py-1 px-2">
        <slot name="left" />
      </div>
      <div
        class="basis-1/3 border-l flex flex-col items-center overflow-y-auto h-[34rem] my-2 mr-2"
      >
        <slot name="right" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup></script>

<style scoped>
::-webkit-scrollbar {
  width: 0.4rem;
}

::-webkit-scrollbar-track {
  --tw-bg-opacity: 1;
  background-color: rgb(228 228 231 / var(--tw-bg-opacity));
  /*box-shadow: inset 0 0 5px gray;*/
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  /*background: var(--bs-secondary);*/
  --tw-bg-opacity: 0.4;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity));
  border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity));
}
</style>
