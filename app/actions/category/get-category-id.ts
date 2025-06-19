import { GET_CATEGORY_ID } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { CategoryResponse } from "@/app/models/category";
import AsyncStorage from "@react-native-async-storage/async-storage";

type getCategoryParams = {
  id: string;
};

export default async function getCategoryId({ id }: getCategoryParams) {
  try {
    const { url } = GET_CATEGORY_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar a categoria.");
    }

    const data = (await response.json()) as CategoryResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
