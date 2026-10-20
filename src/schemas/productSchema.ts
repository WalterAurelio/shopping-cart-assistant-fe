import * as z from "zod";

export const productSchema = z.object({
  categoria: z.string().min(1, "La categoría es requerida"),
  marca: z.string().min(1, "La marca es requerida"),
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1")
});

export type Product = z.infer<typeof productSchema>;
