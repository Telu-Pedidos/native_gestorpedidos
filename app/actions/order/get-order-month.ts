import { GET_ORDER_MONTH } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { OrderResponse } from "@/app/models/order";
import AsyncStorage from "@react-native-async-storage/async-storage";

type getOrderParams = {
  month: number;
};

export default async function getOrderMonth({ month }: getOrderParams) {
  try {
    const { url } = GET_ORDER_MONTH(month);
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
