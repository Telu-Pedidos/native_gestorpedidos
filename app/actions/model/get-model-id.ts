import { GET_MODEL_ID } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { ModelResponse } from "@/app/models/model";
import AsyncStorage from "@react-native-async-storage/async-storage";

type getModelParams = {
  id: string;
};

export default async function getModelId({ id }: getModelParams) {
  try {
    const { url } = GET_MODEL_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar o modelo.");
    }

    const data = (await response.json()) as ModelResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
