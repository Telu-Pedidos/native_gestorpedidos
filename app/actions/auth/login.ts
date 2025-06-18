import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN } from "@/app/functions/api";
import apiError from "@/app/functions/api-error";
import { LoginFormValues } from "@/app/validations/login-validation";

export default async function login(formData: LoginFormValues) {
  try {
    const { url } = LOGIN();

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Senha ou usuário inválidos.");
    }

    const data = await response.json();
    if (!data.token) throw new Error("Token não retornado pela API.");
    await AsyncStorage.setItem("token", String(data.token));

    console.log("data.token: ", data.token);

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
