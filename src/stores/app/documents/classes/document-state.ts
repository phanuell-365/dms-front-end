import { CreateDocumentStateStore } from "../interfaces";

export class DocumentState implements CreateDocumentStateStore {
  fileId: string;
  title: string;
  creator: string;
  description: string;
  creationDate: string;
  keywords: string[];
  contributors: string[];
  purposeChange: string;
  versionType: string;
  lastModified: number;
  ready: boolean;

  constructor(fileId: string, lastModified: number, fileName: string) {
    this.fileId = fileId;
    this.lastModified = lastModified;
    this.title = fileName;
    this.creator = "";
    this.description = "";
    this.creationDate = "";
    this.keywords = [];
    this.contributors = [];
    this.purposeChange = "";
    this.versionType = "";
    this.ready = false;
  }

  setDocumentState(state: CreateDocumentStateStore) {
    this.fileId = state.fileId;
    this.title = state.title;
    this.creator = state.creator;
    this.description = state.description;
    this.creationDate = state.creationDate;
    this.keywords = state.keywords;
    this.contributors = state.contributors;
    this.purposeChange = state.purposeChange;
    this.versionType = state.versionType;
    this.lastModified = state.lastModified;
    this.ready = state.ready;
  }

  getDocumentState(): CreateDocumentStateStore {
    return {
      fileId: this.fileId,
      title: this.title,
      creator: this.creator,
      description: this.description,
      creationDate: this.creationDate,
      keywords: this.keywords,
      contributors: this.contributors,
      purposeChange: this.purposeChange,
      versionType: this.versionType,
      lastModified: this.lastModified,
      ready: this.ready,
    };
  }

  resetDocumentState() {
    this.fileId = "";
    this.title = "";
    this.creator = "";
    this.description = "";
    this.creationDate = "";
    this.keywords = [];
    this.contributors = [];
    this.purposeChange = "";
    this.versionType = "";
    this.lastModified = 0;
    this.ready = false;
  }

  getIfReady() {
    // if the document is ready, return 'ready'
    // if the document is not ready, return 'incomplete'
    return this.ready ? "ready" : "incomplete";
  }

  getIfReadyTextColor() {
    // if the document is ready, return 'text-green-500'
    // if the document is not ready, return 'text-red-500'
    return this.ready ? "text-green-500" : "text-red-500";
  }

  getIfReadyBackgroundColor() {
    // if the document is ready, return 'bg-green-100'
    // if the document is not ready, return 'bg-red-100'
    return this.ready ? "bg-green-50" : "bg-red-50";
  }
}
