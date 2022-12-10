import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";

export const useRouterStore = defineStore("router", () => {
  const currentRouteName: Ref<string> = ref("");
  const currentRoutePath: Ref<string> = ref("");

  function setCurrentRoute(routeName: string, routePath: string) {
    currentRouteName.value = routeName;
    currentRoutePath.value = routePath;
  }

  const getCurrentRouteName = computed(() => currentRouteName.value);
  const getCurrentRoutePath = computed(() => currentRoutePath.value);

  return {
    setCurrentRoute,
    getCurrentRouteName,
    getCurrentRoutePath,
    currentRouteName,
  };
});
