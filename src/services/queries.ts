import { useMutation } from "@tanstack/react-query";
import { postProducts, uploadFiles } from "./api";
import { useNavigate } from "react-router";
import { useFilesStore } from "../store/filesStore";

export function useUploadFiles() {
  const navigate = useNavigate();
  const setUploadedFiles = useFilesStore((state) => state.setUploadedFiles);

  return useMutation({
    mutationFn: uploadFiles,
    onSuccess: (data) => {
      console.log("Files uploaded successfully:", data);
      setUploadedFiles([]);
      navigate("/results", { state: { response: data } });
    },
  });
}

export function usePostProducts() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postProducts,
    onSuccess: (data) => {
      console.log("Products posted successfully:", data);
      navigate("/results", { state: { response: data } });
    },
  });
}
