import { GET_CLIENTS } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { ClientResponse } from "@/app/models/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

type getClientsParams = {
  name?: string;
};

export default async function getClients({ name = "" }: getClientsParams = {}) {
  try {
    const { url } = GET_CLIENTS({ name });
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar os clientes.");
    const data = (await response.json()) as ClientResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
