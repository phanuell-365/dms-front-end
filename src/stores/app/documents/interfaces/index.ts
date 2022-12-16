export interface ViewDocumentsObject {
  id: string;
  title: string;
  creator: string;
  description: string;
  creationDate: string;
  keywords: string[];
  type: string;
}

export interface CreateDocumentObject {
  title: string;
  creator: string;
  description: string;
  creationDate: string;
  keywords: string[];
  contributors: string[];
  purposeChange: string;
  versionType: string;
}

export interface CreateDocumentStateStore {
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
}
