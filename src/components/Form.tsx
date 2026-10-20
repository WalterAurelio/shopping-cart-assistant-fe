import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/base/input/input";
import { InputNumber } from "@/components/base/input/input-number";
import { usePostProducts } from "../services/queries";
import { useLocation } from "react-router";
import { ResultsState } from "../pages/results";
import Button from "./Button";

export type Product = {
  categoria: string;
  marca: string;
  cantidad: number;
};

type FormValues = {
  products: Product[];
};

function Form() {
  const { mutate } = usePostProducts();
  const { state } = useLocation() as { state: ResultsState };
  const defaultValues: FormValues = state?.response?.data.detectedProducts
    ? { products: state.response.data.detectedProducts }
    : {
        products: [{ categoria: "", marca: "", cantidad: 1 }],
      };
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-4">
          <Controller
            name={`products.${index}.categoria`}
            control={control}
            render={({ field }) => <Input {...field} type="text" label="Categoría:" placeholder="Ingresar categoría del producto" />}
          />
          <Controller
            name={`products.${index}.marca`}
            control={control}
            render={({ field }) => <Input {...field} type="text" label="Marca:" placeholder="Ingresar marca del producto" />}
          />
          <Controller
            name={`products.${index}.cantidad`}
            control={control}
            render={({ field }) => (
              <InputNumber {...field} orientation="horizontal" label="Cantidad:" minValue={1} placeholder="Ingresar cantidad del producto" />
            )}
          />
          <Button type="button" buttonStyle="minimal" onClick={() => remove(index)}>
            Eliminar
          </Button>
        </div>
      ))}
      <Button type="button" buttonStyle="outline" onClick={() => append({ categoria: "", marca: "", cantidad: 1 })}>
        Agregar campo
      </Button>
      <div className="h-px w-full bg-gray-500"></div>
      <Button className="self-end" type="submit">
        Enviar productos
      </Button>
    </form>
  );
}
export default Form;
