import { GET_PRODUCTS } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { ProductResponse } from "@/app/models/product";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getProducts() {
  try {
    const { url } = GET_PRODUCTS();
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar os produtos.");
    const data = (await response.json()) as ProductResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
