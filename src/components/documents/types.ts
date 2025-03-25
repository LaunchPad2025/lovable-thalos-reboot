
export interface Document {
  id: string;
  title: string;
  type: "safety" | "training" | "report" | "template";
  date: string;
  owner: string;
  fileSize: string;
  fileType: string;
  lastModified?: string;
}
