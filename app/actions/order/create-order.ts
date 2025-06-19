import { POST_ORDER } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { OrderFormValues } from "@/app/validations/order-validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function createOrder(formData: OrderFormValues) {
  try {
    const { url } = POST_ORDER();
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || errorData.total || "Erro ao cadastrar o pedido",
      );
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
