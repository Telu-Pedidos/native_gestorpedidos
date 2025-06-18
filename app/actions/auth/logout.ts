import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default async function logout() {
  try {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}
