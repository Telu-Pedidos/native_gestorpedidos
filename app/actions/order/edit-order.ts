import { PUT_ORDER } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { OrderFormValues } from "@/app/validations/order-validation";

export default async function editOrder(formData: OrderFormValues, id: string) {
  try {
    const { url } = PUT_ORDER(id);

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao editar o pedido");
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
