<template>
  <!--  Create a fieldset for creating the document metadata  -->
  <fieldset>
    <legend class="text-sm text-gray-400">Document metadata</legend>

    <div class="md:flex flex-row flex-wrap mx-3">
      <FormInput
        v-model="title"
        :form-input-value="title"
        :form-is-valid="formIsInvalid"
        :validate-form-input="titleValidation"
        input-name="title"
        required
      />

      <FormInput
        v-model="creator"
        :form-input-value="creator"
        :form-is-valid="formIsInvalid"
        :validate-form-input="creatorValidation"
        input-name="creator"
        required
      />

      <DisabledFormInput
        :form-input-value="lastModified"
        input-name="lastModified"
      />

      <FormTextarea
        v-model="description"
        :form-is-valid="formIsInvalid"
        :form-textarea-value="description"
        :validate-form-textarea="descriptionValidation"
        required
        textarea-name="description"
      />

      <FormTextarea
        v-model="keywords"
        :form-is-valid="formIsInvalid"
        :form-textarea-value="keywords"
        :validate-form-textarea="keywordsValidation"
        required
        textarea-name="keywords"
      />

      <FormTextarea
        v-model="contributors"
        :form-is-valid="formIsInvalid"
        :form-textarea-value="contributors"
        :validate-form-textarea="contributorsValidation"
        required
        textarea-name="contributors"
      />
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useField } from "vee-validate";
import { useFileUploadStore } from "../../../stores/app/files/file-upload";
import moment from "moment";
import FormInput from "../inputs/FormInput.vue";
import FormTextarea from "../inputs/FormTextarea.vue";
import DisabledFormInput from "../inputs/DisabledFormInput.vue";

interface CreateFormProps {
  fileId: string;
}

const props = defineProps<CreateFormProps>();

watch(props, (value) => {
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
