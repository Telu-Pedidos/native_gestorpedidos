import { GET_ORDER_ID } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { OrderResponse } from "@/app/models/order";

type getOrderParams = {
  id: string;
};

export default async function getOrderId({ id }: getOrderParams) {
  try {
    const { url } = GET_ORDER_ID(id);

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar o pedido.");
    }

    const data = (await response.json()) as OrderResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
