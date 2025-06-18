import { FINISH_ORDER } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";

export default async function finishOrder(id: string) {
  try {
    const { url } = FINISH_ORDER(id);

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao finalizar o pedido");
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
