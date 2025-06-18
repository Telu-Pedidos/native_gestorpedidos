import { GET_ORDERS } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { OrderResponse } from "@/app/models/order";
import { Status } from "@/app/validations/order-validation";

type getOrdersParams = {
  status?: Status;
  startDate?: string;
  endDate?: string;
};

export default async function getOrders({
  status,
  startDate,
  endDate,
}: getOrdersParams = {}) {
  try {
    const { url } = GET_ORDERS({ status, startDate, endDate });

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) throw new Error("Erro ao buscar os pedidos.");

    const data = (await response.json()) as OrderResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
