import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default async function logout() {
  const navigation = useNavigation<NavigationProps>();

  try {
    navigation.navigate("Login");
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}
