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
        @valid="onValid"
      />

      <FormInput
        v-model="creator"
        :form-input-value="creator"
        :form-is-valid="formIsInvalid"
        :validate-form-input="creatorValidation"
        input-name="creator"
        required
        @valid="onValid"
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
import { computed, Ref, ref, watch } from "vue";
import moment from "moment";
import FormInput from "../inputs/FormInput.vue";
import FormTextarea from "../inputs/FormTextarea.vue";
import DisabledFormInput from "../inputs/DisabledFormInput.vue";
import { DocumentState } from "../../../stores/app/documents/classes/document-state";
import { useUploadDocumentsStore } from "../../../stores/app/documents/upload-documents";
import { storeToRefs } from "pinia";

interface CreateFormProps {
  fileId: string;
}

const props = defineProps<CreateFormProps>();

const uploadDocumentStore = useUploadDocumentsStore();

const {
  getDocumentStateById,
  fileId,
  title,
  creator,
  description,
  keywords,
  contributors,
  lastModified,
} = storeToRefs(uploadDocumentStore);

watch(props, (value) => {
  fileId.value = value.fileId;
  currentDocumentState.value = getDocumentStateById.value(fileId.value);
});

uploadDocumentStore.setCurrentDocumentState(props.fileId);

const currentDocumentState: Ref<DocumentState | undefined> = ref(
  getDocumentStateById.value(fileId.value)
);

// create the title field
const titleValidation = (value: string) => {
  if (!value) return "This is a required field";
  if (value.length < 3) {
    return "Title must be at least 3 characters";
  }

  return true;
};

// const title = ref();

const titleIsValid = ref(false);

// create the creator field

const creatorValidation = (value: string) => {
  if (!value) return "This is a required field";

  return true;
};

// const creator = ref();
const creatorIsValid = ref(false);

// create the description field

const descriptionValidation = (value: string) => {
  if (!value) return "This is a required field";
  if (value.length < 3) {
    return "Description must be at least 3 characters";
  }

  return true;
};

// const description = ref();
const descriptionIsValid = ref(false);

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

// const keywords = ref();
const keywordsIsValid = ref(false);

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

// const contributors = ref();
const contributorsIsValid = ref(false);

// const lastModified = ref();

// listeners for the form inputs.

const onValid = (inputName: string, inputMeta: boolean) => {
  switch (inputName) {
    case "title": {
      console.error(inputName, inputMeta);
      titleIsValid.value = inputMeta;
      break;
    }
    case "creator": {
      console.error(inputName, inputMeta);
      creatorIsValid.value = inputMeta;
      break;
    }
  }
};

// init fields
if (currentDocumentState.value) {
  title.value = currentDocumentState.value?.title;
  creator.value = currentDocumentState.value?.creator;
  description.value = currentDocumentState.value?.description;
  keywords.value = currentDocumentState.value?.keywords;
  contributors.value = currentDocumentState.value?.contributors;
  lastModified.value = moment(currentDocumentState.value.lastModified).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
}

// watch for changes on the uploadedFile
// and update the title and the last modified date fields

watch(currentDocumentState, (value) => {
  if (value) {
    // title.value = value.title;
    // creator.value = <string>currentDocumentState.value?.creator;
    // description.value = <string>currentDocumentState.value?.description;
    // keywords.value = <string[]>currentDocumentState.value?.keywords;
    // contributors.value = <string[]>currentDocumentState.value?.contributors;
    // lastModified.value = moment(value.lastModified).format(
    //     "MMMM Do YYYY, h:mm:ss a"
    // );
  }
});

const formIsValid = ref(true);

const validateForm = () => {
  formIsValid.value =
    titleIsValid.value &&
    creatorIsValid.value &&
    descriptionIsValid.value &&
    keywordsIsValid.value &&
    contributorsIsValid.value;
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
