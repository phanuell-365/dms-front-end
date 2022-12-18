<template>
  <label class="inline-block basis-1/2 p-3">
    <span
      :class="{
        'after:content-[\'*\'] after:ml-0.5 after:text-red-500': required,
      }"
      class="block text-sm font-medium text-stone-700 pb-2"
    >
      {{ startCase(inputName) }}
    </span>
    <input
      :id="inputName"
      :class="{
        'border-pink-600 focus:border-pink-600 focus:ring-pink-600 caret-pink-600 text-pink-500':
          (!formInputMeta.valid && formInputMeta.validated) ||
          (!formInputMeta.validated && !formIsValid),
        'border-stone-300 focus:border-sky-500 focus:ring-sky-500 caret-sky-200':
          !(
            (!formInputMeta.valid && formInputMeta.validated) ||
            (!formInputMeta.validated && !formIsValid)
          ),
      }"
      :name="inputName"
      :value="modelValue"
      autocomplete="off"
      class="peer text-sm block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
      required
      type="text"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <template v-if="required">
      <small
        v-if="!formInputMeta.valid && formInputMeta.validated"
        class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
      >
        {{ formInputErrorMessage }}
      </small>
      <small
        v-else-if="!formInputMeta.validated && !formIsValid"
        class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
      >
        This is a required field
      </small>
    </template>
  </label>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import startCase from "lodash/startCase";
import { ref, watch } from "vue";

interface FormInputProps {
  inputName: string;
  formIsValid: boolean;
  modelValue: unknown;
  formInputValue: any;
  required?: boolean;

  validateFormInput(value: any): string | boolean;
}

const props = defineProps<FormInputProps>();

watch(props, (value) => {
  formInput.value = value.formInputValue;
});

const {
  value: formInput,
  errorMessage: formInputErrorMessage,
  meta: formInputMeta,
} = useField("title", props.validateFormInput);

const refFormInputValue = ref(props.formInputValue);

formInput.value = refFormInputValue.value;

defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
