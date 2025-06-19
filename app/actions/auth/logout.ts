import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default async function logout() {
  const navigation = useNavigation<NavigationProps>();

  try {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");

    // router.replace("/login");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}
