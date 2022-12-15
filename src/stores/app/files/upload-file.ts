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
    if (this.file.name.length > 20) {
      // extract the file name without the extension
      const fileName = this.file.name.split(".").slice(0, -1).join(".");
      // extract the file extension
      const fileExtension = this.file.name.split(".").pop();
      // return the file name with the extension
      return `${fileName.substring(0, 20)}...${fileExtension}`;
    } else {
      return this.file.name;
    }
  }

  get size() {
    return this.file.size;
  }

  get type() {
    return this.file.type;
  }

  get extension() {
    return this.name.split(".").pop();
  }

  get fileTextColor() {
    switch (this.extension) {
      case "pdf":
        return "text-red-500";
      case "doc":
      case "docx":
        return "text-blue-500";
      case "xls":
      case "xlsx":
        return "text-green-500";
      case "ppt":
      case "pptx":
        return "text-yellow-500";
      case "txt":
      case "rtf":
        return "text-gray-500";
      case "odt":
      case "ods":
      case "odp":
      case "odg":
      case "odf":
        return "text-purple-500";
      case "bmp":
      case "svg":
      case "svgz":
        return "text-pink-500";
      case "html":
      case "htm":
      case "xhtml":
      case "xht":
      case "xml":
      case "xsl":
      case "xslt":
      case "xbl":
      case "xaml":
      case "xul":
        return "text-indigo-500";
      case "c":
      case "cc":
      case "cpp":
      case "cxx":
      case "c++":
        return "text-orange-500";
      case "h":
      case "hh":
      case "hpp":
      case "hxx":
      case "h++":
        return "text-teal-500";
      case "cs":
        return "text-cyan-500";
      case "java":
        return "text-blue-500";
      case "m":
      case "mm":
        return "text-green-500";
      case "py":
        return "text-yellow-500";
      case "pl":
      case "pm":
        return "text-gray-500";
      case "rb":
        return "text-purple-500";
      case "sh":
      case "csh":
      case "tcsh":
      case "ksh":
      case "bash":
      case "bat":
      case "cmd":
        return "text-pink-500";
      default:
        return "text-indigo-500";
    }
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
