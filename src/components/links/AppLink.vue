<template>
  <a v-if="isExternalLink" :href="href" target="_blank" v-bind="$attrs">
    <slot />
  </a>
  <RouterLink v-else :to="href" custom>
    <a
      :class="isActive ? activeClass : inactiveClass"
      :href="href"
      v-bind="$attrs"
      @click="navigate"
    >
      <slot />
    </a>
  </RouterLink>
</template>

<script lang="ts">
import { RouterLink, useLink } from "vue-router";
import { computed } from "vue";

export default {
  name: "AppLink",
  inheritAttrs: false,
  props: {
    // @ts-ignore - Vue Router types are not compatible with Vue 3
    ...RouterLink.props,
    inactiveClass: {
      type: String,
      required: true,
      default: "text-gray-500 hover:text-gray-700",
    },
    activeClass: {
      type: String,
      required: true,
      default: "text-gray-900",
    },
  },

  setup(props: any) {
    const { navigate, href, route, isActive, isExactActive } = useLink(props);

    const isExternalLink = computed(() => {
      return typeof props.to === "string" && props.to.startsWith("http");
    });

    return { navigate, href, route, isActive, isExactActive, isExternalLink };
  },
};
</script>

<style scoped></style>
