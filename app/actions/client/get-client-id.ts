import { GET_CLIENT_ID } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { ClientResponse } from "@/app/models/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

type getClientParams = {
  id: string;
};

export default async function getClientId({ id }: getClientParams) {
  try {
    const { url } = GET_CLIENT_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar o cliente.");
    }

    const data = (await response.json()) as ClientResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
