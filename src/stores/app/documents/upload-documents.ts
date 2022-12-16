import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { DocumentState } from "./classes/document-state";
import { UploadFile } from "../files/upload-file";

export const useUploadDocumentsStore = defineStore("upload-document", () => {
  const documents: Ref<DocumentState[]> = ref([]);

  function addDocumentState(uploadFile: UploadFile) {
    documents.value.push(
      new DocumentState(
        uploadFile.fileId,
        uploadFile.lastModified,
        uploadFile.fullNameWithoutExtension
      )
    );
  }

  function removeDocumentState(uploadFile: UploadFile) {
    documents.value = documents.value.filter(
      (document) => document.fileId !== uploadFile.fileId
    );
  }

  return {
    documents,
    addDocumentState,
    removeDocumentState,
  };
});
