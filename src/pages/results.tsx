import { Link, useLocation } from "react-router";
import type { Product } from "../schemas/productSchema";
import Form from "../components/Form";

export type ResultsState = {
  response: {
    message: string;
    data: {
      totalPrice: number;
      detectedProducts: Product[];
    };
  };
};

function Results() {
  const { state } = useLocation() as { state: ResultsState };
  const totalPrice = state?.response?.data.totalPrice;
  const formattedTotalPrice = totalPrice?.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  if (totalPrice === undefined) {
    return <div className="text-3xl font-bold text-white">Error: Precio total no encontrado</div>;
  }

  return (
    <div className="flex flex-col gap-8 p-8 text-white">
      <p className="text-3xl font-bold">Precio total: {formattedTotalPrice}</p>
      <br />
      <div>
        <p className="text-xl font-bold">Productos detectados:</p>
        <p>Los productos pueden haber sido detectados incorrectamente. Compruebe los datos y corrija si es necesario.</p>
      </div>
      <Form />
      <br />
      <Link to="/" className="text-brand-500 hover:text-brand-300 hover:underline">
        Volver a la pantalla de inicio
      </Link>
    </div>
  );
}
export default Results;
