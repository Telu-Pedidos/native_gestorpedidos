import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function logout() {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error(
      "Erro ao remover token do AsyncStorage durante o logout:",
      error,
    );
  }
}
