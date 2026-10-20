import { create } from "zustand";

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  failed?: boolean;
  fileObject?: File;
};

type FilesStore = {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (files: UploadedFile[]) => void;
};

export const useFilesStore = create<FilesStore>((set) => ({
  uploadedFiles: [],
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
}));
