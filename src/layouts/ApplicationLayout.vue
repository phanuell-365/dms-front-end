<template>
  <div class="h-screen">
    <div class="max-w-[82rem] mx-auto px-3 sm:px-4 md:px-3">
      <aside
        class="hidden fixed lg:block z-20 bg-emerald-600 inset-0 pb-10 px-5 right-auto w-[15rem] left-[max(0px,calc(50%-45rem))]"
      >
        <SidebarLayout />
        <BottomAvatar />
      </aside>

      <nav class="lg:pl-[13rem]">Dashboard</nav>
      <main class="lg:pl-[15rem] bg-zinc-50">
        <div>
          <slot name="pages" />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SidebarLayout from "./SidebarLayout.vue";
import BottomAvatar from "../components/sidebar/BottomAvatar.vue";
</script>

<style scoped></style>
