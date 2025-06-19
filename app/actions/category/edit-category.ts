import { PUT_CATEGORY } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { CategoryFormValues } from "@/app/validations/category-validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function editCategory(
  formData: CategoryFormValues,
  id: string,
) {
  try {
    const { url } = PUT_CATEGORY(id);
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao editar a categoria");
    }

    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
