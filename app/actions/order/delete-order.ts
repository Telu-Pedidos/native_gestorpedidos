import { DELETE_ORDER } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";

export default async function deleteOrder(id: string) {
  try {
    const { url } = DELETE_ORDER(id);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {},
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar o pedido.");
    }
  } catch (error: unknown) {
    return apiError(error);
  }
}
