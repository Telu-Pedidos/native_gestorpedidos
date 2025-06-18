import { GET_ORDER_MONTH } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { OrderResponse } from "@/app/models/order";

type getOrderParams = {
  month: number;
};

export default async function getOrderMonth({ month }: getOrderParams) {
  try {
    const { url } = GET_ORDER_MONTH(month);

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar o mês do pedido.");
    }

    const data = (await response.json()) as OrderResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
