import type { SubmitEvent } from "react";
import { FileUploadProgressBar } from "@/components/FileUploadProgressBar";
import { useFilesStore } from "../store/filesStore";
import Form from "../components/Form";
import { useUploadFiles } from "@/services/queries";
import Button from "../components/Button";

export function HomeScreen() {
  const uploadedFiles = useFilesStore((state) => state.uploadedFiles);
  const { mutate } = useUploadFiles();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const filesToSubmit = uploadedFiles.map((file) => file.fileObject);

      filesToSubmit.forEach((file) => {
        if (file) {
          formData.append("cart_image", file);
        }
      });

      console.log("Submit button clicked");
      mutate(formData);
      // const response = await mutateAsync(formData);
      // console.log("Response from server", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <legend className="text-2xl font-bold text-white">Sube una imagen del carrito de compras</legend>
        <FileUploadProgressBar />
        <Button className="self-end">Enviar archivos</Button>
      </form>

      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-white">O ingresa los productos manualmente</p>
        <Form />
      </div>
    </div>
  );
}
