import { DELETE_PRODUCT } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function deleteProduct(id: string) {
  try {
    const { url } = DELETE_PRODUCT(id);
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar o produto.");
    }
  } catch (error: unknown) {
    return apiError(error);
  }
}
