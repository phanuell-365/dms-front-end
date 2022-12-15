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
  </div>
</template>

<script lang="ts" setup>
import { DocumentPlusIcon } from "@heroicons/vue/24/outline";
import { onMounted, onUnmounted, ref } from "vue";
import { useFileUploadStore } from "../../stores/app/files/file-upload";

const fileUploadStore = useFileUploadStore();

const fileInput = ref<HTMLInputElement | null>(null);

const dropArea = ref<HTMLElement | null>(null);

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
    fileUploadStore.addFiles(files);
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
    //  upload files
    fileUploadStore.addFiles(files);
  }
};

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName as any, dragCallback, false);
  });
});
</script>

<style scoped></style>
