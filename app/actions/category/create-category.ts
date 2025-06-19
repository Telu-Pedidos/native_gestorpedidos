import { POST_CATEGORY } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { CategoryFormValues } from "@/app/validations/category-validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function createCategory(formData: CategoryFormValues) {
  try {
    const { url } = POST_CATEGORY();
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
      throw new Error(errorData.message || "Erro ao cadastrar a categoria");
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
