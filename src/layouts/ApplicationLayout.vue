<template>
  <div class="bg-zinc-50">
    <nav class="lg:pl-[calc(100%-calc(100%-16rem))] bg-white relative">
      <NavigationBar />
    </nav>
    <div class="container mx-auto">
      <aside
        class="hidden fixed lg:block z-20 bg-emerald-600 inset-0 pb-10 px-5 right-auto w-[calc(100%-calc(100%-16rem))] left-[max(0px,calc(50%-45rem))]"
      >
        <SidebarLayout />
        <BottomAvatar />
      </aside>

      <div class="lg:pl-[calc(100%-calc(100%-16rem))]">
        <main class="mx-3 h-full">
          <slot name="pages" />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SidebarLayout from "./SidebarLayout.vue";
import BottomAvatar from "../components/sidebar/BottomAvatar.vue";
import NavigationBar from "../components/nav/NavigationBar.vue";
</script>

<style scoped></style>
