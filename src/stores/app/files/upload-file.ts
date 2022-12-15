// create a class to handle the file upload,
// this class will be used to assign id to the file
// to identify if the file is already uploaded
// or not. This class will also assign the file,
// a URL to be used to access the file

// src/stores/app/files/upload-file.ts

// @ts-ignore
import { v4 as uuidV4 } from "uuid";

export class UploadFile {
  id: string;

  fileId: string;
  file: File;
  url: string;

  constructor(file: File) {
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.file = file;
    this.url = URL.createObjectURL(file);
    this.fileId = uuidV4();
  }

  get name() {
    return this.file.name;
  }

  get size() {
    return this.file.size;
  }

  get type() {
    return this.file.type;
  }

  get lastModified() {
    return this.file.lastModified;
  }

  get webkitRelativePath() {
    return this.file.webkitRelativePath;
  }

  removeUrl() {
    URL.revokeObjectURL(this.url);
  }
}
