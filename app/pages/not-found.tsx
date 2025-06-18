import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/navigation";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { ArrowLeftIcon } from "lucide-react-native";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function NotFound() {
  const navigation = useNavigation<NavigationProps>();

  const handleNavigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View className="flex min-h-screen w-full items-center justify-center bg-gray-50 py-2">
      <View className="container mx-auto my-4 flex flex-col items-center justify-center px-5">
        <View className="mx-auto flex w-full max-w-md flex-col gap-4 text-center">
          <View className="mb-2">
            <Image
              size="2xl"
              className="w-full"
              source={{
                uri: "https://ik.imagekit.io/hijykdr24/telupedidos-site/404.png?updatedAt=1750209367855",
              }}
              alt="Erro 404"
            />
          </View>
          <Text className="mb-10 text-center text-3xl font-semibold">
            Desculpe, não conseguimos encontrar esta página.
          </Text>
          <TouchableOpacity
            onPress={handleNavigateToHome}
            className="mt-6 inline-block rounded border-2 border-solid border-primary bg-primary px-8 py-4 font-bold"
          >
            <View className="flex flex-row items-center justify-center gap-2">
              <ArrowLeftIcon />
              <Text className="text-lg font-bold text-primary-foreground focus-visible:text-primary-foreground">
                Voltar à página inicial
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
