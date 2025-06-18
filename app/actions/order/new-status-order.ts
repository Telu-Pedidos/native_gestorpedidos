import { NEW_STATUS_ORDER } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { Status } from "@/app/validations/order-validation";

type newStatusParams = {
  id: string;
  newStatus: Status;
};

export default async function newStatusOrder({
  id,
  newStatus,
}: newStatusParams) {
  try {
    const { url } = NEW_STATUS_ORDER({ id, newStatus });

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erro ao alterar o status do pedido",
      );
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
