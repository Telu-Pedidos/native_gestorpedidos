import { GET_CATEGORIES } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { CategoryResponse } from "@/app/models/category";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getCategories() {
  try {
    const { url } = GET_CATEGORIES();
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar as categorias.");
    const data = (await response.json()) as CategoryResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
