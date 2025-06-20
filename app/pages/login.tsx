import { useState, useEffect, useCallback } from "react";
import { Image } from "@/components/ui/image";
import { BackHandler, Alert } from "react-native";
import { VStack } from "@/components/ui/vstack";
import LoginForm from "@/app/components/login/login-form";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/app/models/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@/components/ui/text";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  const checkTokenStatus = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkTokenStatus();
    });

    return unsubscribe;
  }, [navigation, checkTokenStatus]);

  useEffect(() => {
    if (hasToken === true) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }

    const handleBackPress = () => {
      if (hasToken === false) {
        Alert.alert("Sair do aplicativo?", "Você deseja sair do aplicativo?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Sair", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false;
    };

    const backHandlerSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress,
    );

    return () => {
      backHandlerSubscription.remove();
    };
  }, [hasToken, navigation]);

  return (
    <VStack className="flex-1 items-center gap-12 rounded-lg bg-background px-3 pt-16">
      <Image
        size="xl"
        source={{
          uri: "https://ik.imagekit.io/hijykdr24/telupedidos/logo.png?updatedAt=1746369517720",
        }}
        alt="Logo Télu Personalizados"
      />

      <VStack className="items-center gap-3">
        <Text size="4xl" className="font-bold">
          Faça seu login
        </Text>
        <Text size="md" className="text-muted-foreground">
          Bem vindo de volta! Por favor, insira seus dados.
        </Text>
      </VStack>

      <LoginForm />
    </VStack>
  );
}
