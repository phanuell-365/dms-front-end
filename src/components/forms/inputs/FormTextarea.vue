<template>
  <label class="inline-block basis-full p-3">
    <span
      :class="{
        'after:content-[\'*\'] after:ml-0.5 after:text-red-500': required,
      }"
      class="block text-sm font-medium text-stone-700 pb-2"
    >
      {{ startCase(textareaName) }}
    </span>
    <textarea
      :id="textareaName"
      :value="modelValue"
      :class="{
        'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
          (!formTextareaMeta.valid && formTextareaMeta.validated) ||
          (!formTextareaMeta.validated && !formIsValid),
        'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
          !(
            (!formTextareaMeta.valid && formTextareaMeta.validated) ||
            (!formTextareaMeta.validated && !formIsValid)
          ),
      }"
      autocomplete="off"
      class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
      :name="textareaName"
      required
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
    />
    <template v-if="required">
      <small
        v-if="!formTextareaMeta.valid && formTextareaMeta.validated"
        class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
      >
        {{ formTextareaErrorMessage }}
      </small>
      <small
        v-else-if="!formTextareaMeta.validated && !formIsValid"
        class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
      >
        This is a required field
      </small>
    </template>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useField } from "vee-validate";
import startCase from "lodash/startCase";

interface FormTextareaProps {
  textareaName: string;
  formIsValid: boolean;
  modelValue: unknown;
  formTextareaValue: any;
  required?: boolean;

  validateFormTextarea(value: any): string | boolean;
}

const props = defineProps<FormTextareaProps>();

watch(props, (value) => {
  formTextarea.value = value.formTextareaValue;
});

const {
  value: formTextarea,
  errorMessage: formTextareaErrorMessage,
  meta: formTextareaMeta,
} = useField("title", props.validateFormTextarea);

const refFormTextareaValue = ref(props.formTextareaValue);

formTextarea.value = refFormTextareaValue.value;

defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
