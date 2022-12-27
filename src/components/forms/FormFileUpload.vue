<template>
  <div>
    <!--  create a drag and drop div for file upload  -->
    <div
      ref="dropArea"
      class="flex flex-col items-center justify-center w-72 h-72 border-2 border-dashed border-gray-300 rounded-lg"
      @drop.prevent="onDrop"
    >
      <div class="flex flex-col items-center justify-center">
        <DocumentPlusIcon class="w-8 h-8 text-gray-400 my-2" />
        <p class="my-1 text-sm text-gray-400">Drag and drop your files here</p>
        <p class="my-1 text-sm text-gray-400">or</p>
        <button
          class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
          @click="onFileClick"
        >
          Select a file
        </button>
        <input
          ref="fileInput"
          class="hidden"
          multiple
          type="file"
          @change="onFileChange"
        />
      </div>
    </div>
    <ErrorNotification
      :description="errorNotification.description"
      :show="errorNotification.show"
      :title="errorNotification.title"
      @hover="onHover"
      @close-notification="onCloseNotification"
    />
  </div>
</template>

<script lang="ts" setup>
import { DocumentPlusIcon } from "@heroicons/vue/24/outline";
import { onMounted, onUnmounted, Ref, ref, watch } from "vue";
import { useFileUploadStore } from "../../stores/app/files/file-upload";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import ErrorNotification from "../notifications/ErrorNotification.vue";
import { PopupNotification } from "../notifications/interface";
import { DmsError } from "../../errors/dms-error";
import { useDisplayErrNotification } from "../../composables/disp-err-notif";

const fileUploadStore = useFileUploadStore();

const { getLastUploadedFile } = storeToRefs(fileUploadStore);

const router = useRouter();

const fileInput = ref<HTMLInputElement | null>(null);

const dropArea = ref<HTMLElement | null>(null);

const errorNotification: Ref<PopupNotification> = ref({
  title: "",
  description: "",
  show: false,
});

const delay = ref(5000);

const hovering = ref(false);

const timeoutId = ref();

watch(hovering, (value) => {
  if (value) {
    clearTimeout(timeoutId.value);
  } else {
    setTimeout(() => {
      if (errorNotification.value) errorNotification.value.show = false;
    }, delay.value);
  }
});

const onFileClick = () => {
  fileInput.value?.click();
};

const onFileChange = (e: Event) => {
  const dataTransferFiles = (e.target as HTMLInputElement).files;

  const files = [];

  if (dataTransferFiles) {
    for (let i = 0; i < dataTransferFiles.length; i++) {
      files.push(dataTransferFiles[i]);
    }
  }

  if (files.length > 0) {
    try {
      //  upload files
      fileUploadStore.addFiles(files);

      if (getLastUploadedFile.value)
        router.push({
          name: "upload-document-files",
          params: {
            id: getLastUploadedFile.value.fileId,
          },
        });
    } catch (error: any) {
      if (error instanceof DmsError) {
        console.error(error);
        errorNotification.value = useDisplayErrNotification(error).value;
        timeoutId.value = setTimeout(() => {
          if (errorNotification.value) errorNotification.value.show = false;
        }, delay.value);
      }
    }
  }
};

const dragCallback = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName as any, dragCallback, false);
  });
});

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (dropArea.value) {
    dropArea.value.classList.remove("border-emerald-600");
  }
  const files = [];

  if (e.dataTransfer?.items) {
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      if (e.dataTransfer.items[i].kind === "file") {
        const file = e.dataTransfer.items[i].getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }
  } else {
    if (e.dataTransfer?.files) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        files.push(e.dataTransfer.files[i]);
      }
    }
  }

  if (files.length > 0) {
    try {
      //  upload files
      fileUploadStore.addFiles(files);

      if (getLastUploadedFile.value)
        router.push({
          name: "upload-document-files",
          params: {
            id: getLastUploadedFile.value.fileId,
          },
        });
    } catch (error: any) {
      if (error instanceof DmsError) {
        console.error(error);
        errorNotification.value = useDisplayErrNotification(error).value;
        timeoutId.value = setTimeout(() => {
          if (errorNotification.value) errorNotification.value.show = false;
        }, delay.value);
      }
    }
  }
};

const onCloseNotification = () => {
  errorNotification.value.show = false;
  clearTimeout(timeoutId.value);
};

const onHover = (value: boolean) => {
  hovering.value = value;
};

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName as any, dragCallback, false);
  });
});
</script>

<style scoped></style>
