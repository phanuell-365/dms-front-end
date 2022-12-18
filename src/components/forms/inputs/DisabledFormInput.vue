<template>
  <label class="inline-block basis-1/2 p-3">
    <span class="block text-sm font-medium text-stone-700 pb-2">
      {{ startCase(inputName) }}
    </span>
    <input
      :id="inputName"
      :name="inputName"
      :value="formInputValue"
      class="text-sm block disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-full border rounded-md py-2 px-3 shadow-sm sm:text-sm"
      disabled
      type="text"
    />
  </label>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";
import { ref, watch } from "vue";

interface DisabledFormInputProps {
  inputName: string;
  formInputValue: any;
}

const props = defineProps<DisabledFormInputProps>();

watch(props, (value) => {
  refFormInputValue.value = value.formInputValue;
});

const refFormInputValue = ref(props.formInputValue);
</script>

<style scoped></style>
