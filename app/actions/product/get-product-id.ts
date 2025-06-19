import { GET_PRODUCT_ID } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { ProductResponse } from "@/app/models/product";
import AsyncStorage from "@react-native-async-storage/async-storage";

type getProductParams = {
  id: string;
};

export default async function getProductId({ id }: getProductParams) {
  try {
    const { url } = GET_PRODUCT_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar o produto.");
    }

    const data = (await response.json()) as ProductResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
