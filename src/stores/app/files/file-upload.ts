import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import { UploadFile } from "./upload-file";
import { VALID_FILE_EXTENSIONS, VALID_FILE_SIZE } from "./const";
import { DmsError } from "../../../errors/dms-error";
import { useUploadDocumentsStore } from "../documents/upload-documents";

export const useFileUploadStore = defineStore("file-upload", () => {
  const files: Ref<File[]> = ref([]);
  const uploadedFiles: Ref<UploadFile[]> = ref([]);
  const sortedUploadedFiles: Ref<UploadFile[]> = ref([]);
  const isUploading: Ref<boolean> = ref(false);
  const uploadProgress: Ref<number> = ref(0);
  const uploadError: Ref<string> = ref("");

  function validateFileExtension(file: File) {
    const fileExtension = file.name.split(".").pop();
    const allowedExtensions = VALID_FILE_EXTENSIONS;

    if (fileExtension) {
      if (!allowedExtensions.includes(fileExtension)) {
        throw new DmsError("FileUploadError", "File type not allowed", 400);
      }
      return allowedExtensions.includes(fileExtension);
    } else {
      throw new DmsError("FileUploadError", "File type not allowed", 400);
    }
  }

  function validateFileSize(file: File) {
    const fileSize = file.size;
    if (fileSize > VALID_FILE_SIZE) {
      throw new DmsError("FileUploadError", "File size too large", 400);
    } else {
      return true;
    }
  }

  function validateIfFileExists(file: UploadFile) {
    if (uploadedFiles.value.some((value) => value.id === file.id)) {
      throw new DmsError("FileUploadError", "File already exists!", 400);
    }
  }

  function addFiles(newFiles: File[]) {
    const uploadDocumentStore = useUploadDocumentsStore();

    // before adding files, check if their extensions are allowed
    newFiles.forEach((file) => {
      if (!validateFileExtension(file)) {
        uploadError.value = "File type not allowed";
      }
      if (!validateFileSize(file)) {
        uploadError.value = "File size too large";
      }
    });

    // create an upload file for each file
    const newUploadFiles = newFiles.map((file) => {
      const newUploadedFile = new UploadFile(file);
      validateIfFileExists(newUploadedFile);

      // for each uploaded file, create a document state
      uploadDocumentStore.addDocumentState(newUploadedFile);

      return newUploadedFile;
    });

    // add the files to the files array
    files.value = [...files.value, ...newFiles];

    // add the upload files to the uploaded files array
    uploadedFiles.value = [...uploadedFiles.value, ...newUploadFiles];

    // assign the uploaded files to the sorted uploaded files.

    sortedUploadedFiles.value = [...uploadedFiles.value];

    // sort the uploaded files by name
    sortedUploadedFiles.value.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    // reset the upload progress
    uploadProgress.value = 0;

    // reset the upload error
    uploadError.value = "";
  }

  function removeFile(file: File) {
    files.value = files.value.filter((f) => f.name !== file.name);
  }

  function removeUploadedFile(fileId: string) {
    uploadedFiles.value = uploadedFiles.value.filter(
      (f) => f.fileId !== fileId
    );
  }

  function fileExists(file: File) {
    return files.value.some((f) => f.name === file.name);
  }

  function uploadedFileExists(fileId: string) {
    return uploadedFiles.value.some((f) => f.fileId === fileId);
  }

  function clearFiles() {
    files.value = [];
  }

  function clearUploadedFiles() {
    uploadedFiles.value = [];
  }

  function setUploading(uploading: boolean) {
    isUploading.value = uploading;
  }

  function setUploadProgress(progress: number) {
    uploadProgress.value = progress;
  }

  function setUploadError(error: string) {
    uploadError.value = error;
  }

  const getFiles = computed(() => files.value);
  const getUploadedFiles = computed(() => uploadedFiles.value);
  const getSortedUploadedFiles = computed(() => sortedUploadedFiles.value);
  const getIsUploading = computed(() => isUploading.value);
  const getUploadProgress = computed(() => uploadProgress.value);
  const getUploadError = computed(() => uploadError.value);
  const getHasFile = computed(() => uploadedFiles.value.length > 0);
  const getUploadedFileById = (fileId: string) =>
    computed(() =>
      uploadedFiles.value.find((value) => value.fileId === fileId)
    );
  const getLastUploadedFile = computed(() => uploadedFiles.value.at(-1));

  return {
    files,
    uploadedFiles,
    isUploading,
    uploadProgress,
    uploadError,
    addFiles,
    removeFile,
    removeUploadedFile,
    fileExists,
    uploadedFileExists,
    clearFiles,
    clearUploadedFiles,
    setUploading,
    setUploadProgress,
    setUploadError,
    getFiles,
    getUploadedFiles,
    getSortedUploadedFiles,
    getIsUploading,
    getUploadProgress,
    getUploadError,
    getHasFile,
    getUploadedFileById,
    getLastUploadedFile,
  };
});
