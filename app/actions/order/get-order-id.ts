import { GET_ORDER_ID } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { OrderResponse } from "@/app/models/order";
import AsyncStorage from "@react-native-async-storage/async-storage";

type getOrderParams = {
  id: string;
};

export default async function getOrderId({ id }: getOrderParams) {
  try {
    const { url } = GET_ORDER_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar o pedido.");
    }

    const data = (await response.json()) as OrderResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
