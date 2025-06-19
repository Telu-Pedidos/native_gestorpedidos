import { GET_MODELS } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { ModelResponse } from "@/app/models/model";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getModels() {
  try {
    const { url } = GET_MODELS();
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar os modelos.");
    const data = (await response.json()) as ModelResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
