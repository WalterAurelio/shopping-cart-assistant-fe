import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/base/input/input";
import { InputNumber } from "@/components/base/input/input-number";
import { usePostProducts } from "../services/queries";
import { useLocation } from "react-router";
import { ResultsState } from "../pages/results";
import Button from "./Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schemas/productSchema";

const formSchema = z.object({
  products: z.array(productSchema).min(1, "Debe ingresar al menos un producto")
});

type FormValues = z.infer<typeof formSchema>;

function Form() {
  const { mutate, isPending } = usePostProducts();
  const { state } = useLocation() as { state: ResultsState };
  const defaultValues: FormValues = state?.response?.data.detectedProducts
    ? { products: state.response.data.detectedProducts }
    : {
        products: [{ categoria: "", marca: "", cantidad: 1 }]
      };
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  const onSubmit = async (data: FormValues) => {
    try {
      mutate(data);
      // const response = await mutateAsync(data);
      // console.log("Response from server", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-4">
            <div className="flex w-full flex-col gap-1">
              <Controller
                name={`products.${index}.categoria`}
                control={control}
                render={({ field }) => <Input {...field} type="text" label="Categoría:" placeholder="Ingresar categoría del producto" />}
              />
              {errors.products?.[index]?.categoria && <span className="text-red-500">{errors.products[index]?.categoria?.message}</span>}
            </div>
            <div className="flex w-full flex-col gap-1">
              <Controller
                name={`products.${index}.marca`}
                control={control}
                render={({ field }) => <Input {...field} type="text" label="Marca:" placeholder="Ingresar marca del producto" />}
              />
              {errors.products?.[index]?.marca && <span className="text-red-500">{errors.products[index]?.marca?.message}</span>}
            </div>
            <div className="flex w-full flex-col gap-1">
              <Controller
                name={`products.${index}.cantidad`}
                control={control}
                render={({ field }) => <InputNumber {...field} orientation="horizontal" label="Cantidad:" minValue={1} placeholder="Ingresar cantidad del producto" />}
              />
              {errors.products?.[index]?.cantidad && <span className="text-red-500">{errors.products[index]?.cantidad?.message}</span>}
            </div>
            <Button className="mt-4.5" type="button" buttonStyle="minimal" state={isPending ? "disabled" : "idle"} disabled={isPending} onClick={() => remove(index)}>
              Eliminar
            </Button>
          </div>
        ))}
        <Button type="button" buttonStyle="outline" state={isPending ? "disabled" : "idle"} disabled={isPending} onClick={() => append({ categoria: "", marca: "", cantidad: 1 })}>
          Agregar campo
        </Button>
        <div className="h-px w-full bg-gray-500"></div>
        <Button className="self-end" type="submit" state={isPending ? "disabled" : "idle"} disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar productos"}
        </Button>
      </form>
    </>
  );
}
export default Form;
