<template>
  <!-- Using tailwind breakpoints-->
  <!-- On large screens, display the 50 character data preview -->
  <div class="hidden lg:block">
    {{ dataPreviewLarge }}
  </div>
  <!-- On medium screens, display the 30 character data preview -->
  <div class="lg:hidden hidden md:block">
    {{ dataPreviewMedium }}
  </div>
  <!--  On small screens, display the 20 characters data preview -->
  <div class="lg:hidden md:hidden hidden sm:block">
    {{ dataPreviewSmall }}
  </div>

  <!--  On extra small screens, display the 10 characters data preview -->
  <div class="sm:hidden md:hidden lg:hidden block">
    {{ dataPreviewExtraSmall }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface ResponsiveTableDataProps {
  data: string;
}

const props = defineProps<ResponsiveTableDataProps>();

const data = ref(props.data);

// extract the first 50 characters of the data
// check if the characters are more than 50
// if they are, add an ellipsis
// if they are not, return the data

const dataPreviewLarge = ref(
  data.value.length > 50 ? data.value.substring(0, 50) + "..." : data.value
);

// extract the first 30 characters of the data and append a '...' to it
// check if the characters are more than 30
// if they are, add an ellipsis
// if they are not, return the data

const dataPreviewMedium = ref(
  data.value.length > 30 ? data.value.substring(0, 30) + "..." : data.value
);

// extract the first 20 characters of the data and append a '...' to it
// check if the characters are more than 20
// if they are, add an ellipsis
// if they are not, return the data

const dataPreviewSmall = ref(
  data.value.length > 20 ? data.value.substring(0, 20) + "..." : data.value
);

// extract the first 10 characters of the data and append a '...' to it
// check if the characters are more than 10
// if they are, add an ellipsis
// if they are not, return the data

const dataPreviewExtraSmall = ref(
  data.value.length > 10 ? data.value.substring(0, 10) + "..." : data.value
);
</script>

<style scoped></style>
