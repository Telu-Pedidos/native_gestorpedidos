import { ACTIVATE_PRODUCT } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function activateProduct(id: string) {
  try {
    const { url } = ACTIVATE_PRODUCT(id);
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
      throw new Error(errorData.message || "Erro ao ativar o produto");
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
