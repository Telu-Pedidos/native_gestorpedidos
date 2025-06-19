import { CANCEL_ORDER } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function cancelOrder(id: string) {
  try {
    const { url } = CANCEL_ORDER(id);
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao cancelar o pedido");
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
