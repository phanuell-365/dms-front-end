import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import { DocumentState } from "./classes/document-state";
import { UploadFile } from "../files/upload-file";

export const useUploadDocumentsStore = defineStore("upload-document", () => {
  const documents: Ref<DocumentState[]> = ref([]);
  const currentDocument: Ref<DocumentState | undefined> = ref();

  const fileId: Ref<string> = ref("");
  const title: Ref<string> = ref("");
  const creator: Ref<string> = ref("");
  const description: Ref<string> = ref("");
  const creationDate: Ref<string> = ref("");
  const keywords: Ref<string[]> = ref([]);
  const contributors: Ref<string[]> = ref([]);
  const purposeChange: Ref<string> = ref("");
  const versionType: Ref<string> = ref("");
  const lastModified: Ref<number | string> = ref(0);
  const ready: Ref<boolean> = ref(false);

  function addDocumentState(uploadFile: UploadFile) {
    documents.value.push(
      new DocumentState(
        uploadFile.fileId,
        uploadFile.lastModified,
        uploadFile.fullNameWithoutExtension
      )
    );

    if (documents.value.length === 1) {
      currentDocument.value = documents.value.at(0);
      setCurrentFieldData();
    }
  }

  function setCurrentFieldData() {
    fileId.value = <string>currentDocument.value?.fileId;
    title.value = <string>currentDocument.value?.title;
    creator.value = <string>currentDocument.value?.creator;
    description.value = <string>currentDocument.value?.description;
    creationDate.value = <string>currentDocument.value?.creationDate;
    keywords.value = <string[]>currentDocument.value?.keywords;
    contributors.value = <string[]>currentDocument.value?.contributors;
    purposeChange.value = <string>currentDocument.value?.purposeChange;
    versionType.value = <string>currentDocument.value?.versionType;
    lastModified.value = <number>currentDocument.value?.lastModified;
    ready.value = <boolean>currentDocument.value?.ready;
  }

  function setCurrentDocumentState(fileId: string) {
    const currDoc = ref(
      documents.value.find((value) => value.fileId === fileId)
    );
    if (currDoc.value) {
      currentDocument.value = currDoc.value;
      setCurrentFieldData();
    }
  }

  const getDocumentStateById = computed(
    () => (fileId: string) =>
      documents.value.find((value) => value.fileId === fileId)
  );

  const getCurrentDocument = computed(() => currentDocument.value);

  function removeDocumentState(uploadFile: UploadFile) {
    documents.value = documents.value.filter(
      (document) => document.fileId !== uploadFile.fileId
    );
  }

  return {
    fileId,
    title,
    creator,
    description,
    creationDate,
    keywords,
    contributors,
    purposeChange,
    versionType,
    lastModified,
    ready,
    documents,
    addDocumentState,
    setCurrentDocumentState,
    getDocumentStateById,
    removeDocumentState,
    getCurrentDocument,
  };
});
