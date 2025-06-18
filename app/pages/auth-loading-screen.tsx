import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/app/models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function AuthLoadingScreen() {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    };

    checkToken();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}
