<template>
  <!--  Create a fieldset for creating the document metadata  -->
  <fieldset>
    <legend class="text-sm font-normal text-gray-400">Document metadata</legend>

    <div class="md:flex flex-row flex-wrap mx-3">
      <!--   create the title field   -->
      <!--      <label class="inline-block basis-1/2 p-3">-->
      <!--        <span-->
      <!--          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"-->
      <!--          >Title</span-->
      <!--        >-->
      <!--        <input-->
      <!--          id="title"-->
      <!--          v-model="title"-->
      <!--          :class="{-->
      <!--            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':-->
      <!--              (!titleMeta.valid && titleMeta.validated) ||-->
      <!--              (!titleMeta.validated && !formIsValid),-->
      <!--            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':-->
      <!--              !(-->
      <!--                (!titleMeta.valid && titleMeta.validated) ||-->
      <!--                (!titleMeta.validated && !formIsValid)-->
      <!--              ),-->
      <!--          }"-->
      <!--          autocomplete="off"-->
      <!--          class="peer text-sm block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"-->
      <!--          name="title"-->
      <!--          required-->
      <!--          type="text"-->
      <!--        />-->
      <!--        <small-->
      <!--          v-if="!titleMeta.valid && titleMeta.validated"-->
      <!--          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"-->
      <!--        >-->
      <!--          {{ titleErrorMessage }}-->
      <!--        </small>-->
      <!--        <small-->
      <!--          v-else-if="!titleMeta.validated && !formIsValid"-->
      <!--          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"-->
      <!--        >-->
      <!--          This is a required field-->
      <!--        </small>-->
      <!--      </label>-->

      <FormInput
        v-model="title"
        :form-input-value="title"
        :form-is-valid="formIsInvalid"
        :validate-form-input="titleValidation"
        input-name="title"
      />

      <!--   create the creator field   -->
      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Creator</span
        >
        <input
          id="creator"
          v-model="creator"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!creatorMeta.valid && creatorMeta.validated) ||
              (!creatorMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!creatorMeta.valid && creatorMeta.validated) ||
                (!creatorMeta.validated && !formIsValid)
              ),
          }"
          autocomplete="off"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="creator"
          required
          type="text"
        />
        <small
          v-if="!creatorMeta.valid && creatorMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ creatorErrorMessage }}
        </small>
        <small
          v-else-if="!creatorMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <!--   create the description field as a text area -->
      <label class="inline-block basis-full p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Description</span
        >
        <textarea
          id="description"
          v-model="description"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!descriptionMeta.valid && descriptionMeta.validated) ||
              (!descriptionMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!descriptionMeta.valid && descriptionMeta.validated) ||
                (!descriptionMeta.validated && !formIsValid)
              ),
          }"
          autocomplete="off"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="description"
          required
          type="text"
        />
        <small
          v-if="!descriptionMeta.valid && descriptionMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ descriptionErrorMessage }}
        </small>
        <small
          v-else-if="!descriptionMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <!--   create the keywords field as textarea, inform user to separate by commas -->

      <label class="inline-block basis-full p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Keywords</span
        >
        <textarea
          id="keywords"
          v-model="keywords"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!keywordsMeta.valid && keywordsMeta.validated) ||
              (!keywordsMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!keywordsMeta.valid && keywordsMeta.validated) ||
                (!keywordsMeta.validated && !formIsValid)
              ),
          }"
          autocomplete="off"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="keywords"
          required
          type="text"
        />
        <small
          v-if="!keywordsMeta.valid && keywordsMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ keywordsErrorMessage }}
        </small>
        <small
          v-else-if="!keywordsMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <!--   create the contributors field as textarea -->

      <label class="inline-block basis-full p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Contributors</span
        >
        <textarea
          id="contributors"
          v-model="contributors"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!contributorsMeta.valid && contributorsMeta.validated) ||
              (!contributorsMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!contributorsMeta.valid && contributorsMeta.validated) ||
                (!contributorsMeta.validated && !formIsValid)
              ),
          }"
          autocomplete="off"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="contributors"
          required
          type="text"
        />
        <small
          v-if="!contributorsMeta.valid && contributorsMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ contributorsErrorMessage }}
        </small>
        <small
          v-else-if="!contributorsMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <!--   create the last modified field as a disabled field -->

      <label class="inline-block basis-full p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Last Modified</span
        >
        <input
          id="lastModified"
          v-model="lastModified"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!lastModifiedMeta.valid && lastModifiedMeta.validated) ||
              (!lastModifiedMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!lastModifiedMeta.valid && lastModifiedMeta.validated) ||
                (!lastModifiedMeta.validated && !formIsValid)
              ),
          }"
          autocomplete="off"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          disabled
          name="lastModified"
          required
          type="text"
        />
        <small
          v-if="!lastModifiedMeta.valid && lastModifiedMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ lastModifiedErrorMessage }}
        </small>
        <small
          v-else-if="!lastModifiedMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useField } from "vee-validate";
import { useFileUploadStore } from "../../../stores/app/files/file-upload";
import moment from "moment";
import FormInput from "../inputs/FormInput.vue";

interface CreateFormProps {
  fileId: string;
}

const props = defineProps<CreateFormProps>();

watch(props, (value) => {
  console.error("props", value);
  fileId.value = value.fileId;
  uploadedFile.value = fileUploadStore.getUploadedFileById(value.fileId).value;
});

const fileId = ref(props.fileId);

const fileUploadStore = useFileUploadStore();

const uploadedFile = ref(
  fileUploadStore.getUploadedFileById(fileId.value).value
);

// create the title field
const titleValidation = (value: string) => {
  if (!value) return "This is a required field";
  if (value.length < 3) {
    return "Title must be at least 3 characters";
  }

  return true;
};

const {
  value: title,
  errorMessage: titleErrorMessage,
  meta: titleMeta,
} = useField("title", titleValidation);

// create the creator field

const creatorValidation = (value: string) => {
  if (!value) return "This is a required field";
  if (value.length < 3) {
    return "Creator must be at least 3 characters";
  }

  return true;
};

const {
  value: creator,
  errorMessage: creatorErrorMessage,
  meta: creatorMeta,
} = useField("creator", creatorValidation);

// create the description field

const descriptionValidation = (value: string) => {
  if (!value) return "This is a required field";
  if (value.length < 3) {
    return "Description must be at least 3 characters";
  }

  return true;
};

const {
  value: description,
  errorMessage: descriptionErrorMessage,
  meta: descriptionMeta,
} = useField("description", descriptionValidation);

// create the keywords field

const keywordsValidation = (value: string) => {
  // keywords should be separated by commas
  if (!value) return "This is a required field";
  const keywords = value.split(",");
  if (keywords.length < 3) {
    return "Keywords must be at least 3";
  }

  return true;
};

const {
  value: keywords,
  errorMessage: keywordsErrorMessage,
  meta: keywordsMeta,
} = useField("keywords", keywordsValidation);

// create the contributors field

const contributorsValidation = (value: string) => {
  // contributors should be separated by commas
  if (!value) return "This is a required field";
  const contributors = value.split(",");
  if (contributors.length < 3) {
    return "Contributors must be at least 3";
  }

  return true;
};

const {
  value: contributors,
  errorMessage: contributorsErrorMessage,
  meta: contributorsMeta,
} = useField("contributors", contributorsValidation);

// create the last modified field

const lastModifiedValidation = (value: string) => {
  if (!value) return "This is a required field";
  if (value.length < 3) {
    return "Last Modified must be at least 3 characters";
  }

  return true;
};

const {
  value: lastModified,
  errorMessage: lastModifiedErrorMessage,
  meta: lastModifiedMeta,
} = useField("lastModified", lastModifiedValidation);

// init fields
if (uploadedFile.value) {
  title.value = uploadedFile.value.fullNameWithoutExtension;
  lastModified.value = moment(uploadedFile.value.lastModified).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
}

// watch for changes on the uploadedFile
// and update the title and the last modified date fields

watch(uploadedFile, (value) => {
  if (value) {
    title.value = value.fullNameWithoutExtension;
    lastModified.value = value.lastModified.toString();
    title.value = value.name;
    lastModified.value = moment(value.lastModified).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
  }
});

const formIsValid = ref(true);

const validateForm = () => {
  formIsValid.value =
    titleMeta.valid &&
    creatorMeta.valid &&
    descriptionMeta.valid &&
    keywordsMeta.valid &&
    contributorsMeta.valid &&
    lastModifiedMeta.valid;
};

// create the formIsInvalid computed property
const formIsInvalid = computed(() => {
  return (
    !title.value ||
    !description.value ||
    !keywords.value ||
    !contributors.value ||
    !lastModified.value
  );
});

// create the formIsTouched computed property
const formIsTouched = computed(() => {
  return (
    title.value ||
    description.value ||
    keywords.value ||
    contributors.value ||
    lastModified.value
  );
});
</script>

<style scoped></style>
