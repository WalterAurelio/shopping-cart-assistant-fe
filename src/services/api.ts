import axiosInstance from "../api/axios";
import type { Product } from "../components/Form";

export const uploadFiles = async (formData: FormData) => {
  const res = await axiosInstance.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const postProducts = async ({ products }: { products: Product[] }) => {
  const res = await axiosInstance.post("/products", { products });
  return res.data;
};
