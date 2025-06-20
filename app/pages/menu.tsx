import { useTransition } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@/components/ui/text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { allLinks } from "@/app/utils/links";
import { LogOutIcon } from "lucide-react-native";
import { Link, LinkText } from "@/components/ui/link";
import { FooterSection } from "../components/footer-section";
import logout from "@/app/actions/auth/logout";
import useNewToast from "../hooks/useNewToast";
import { BottomTab } from "../components/bottom-tab";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function MenuScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [isPending, startTransition] = useTransition();
  const { toast } = useNewToast();

  const handleLogout = async () => {
    startTransition(async () => {
      try {
        await logout();
      } catch (err) {
        toast({
          title: "Erro ao deslogar.",
          variant: "error",
        });
      }
    });
  };

  return (
    <>
      <ScrollView className="flex h-full w-full flex-col border-t border-border bg-white py-2 pt-4">
        <View className="flex flex-col border-b border-b-border px-4 pb-3">
          {allLinks.map(({ name, icon: IconComponent, route }) => (
            <TouchableOpacity
              key={route}
              onPress={() => navigation.navigate(route as any)}
              className="flex-row items-center gap-4 py-5"
            >
              <IconComponent size={22} color="#4B5563" />
              <Text className="text-base text-foreground">{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="border-b border-b-border px-4 py-2">
          <TouchableOpacity
            onPress={handleLogout}
            disabled={isPending}
            className="flex-row items-center gap-4 py-5"
          >
            {isPending ? (
              <ActivityIndicator color="#4B5563" size="small" />
            ) : (
              <LogOutIcon size={22} color="#4B5563" />
            )}
            <Text className="text-base text-foreground">Sair</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4 px-4 py-2">
          <Link href="https://bit.ly/m/TeluPersonalizados">
            <LinkText className="text-base text-foreground">
              Acesse todos os links
            </LinkText>
          </Link>
        </View>

        <FooterSection />
      </ScrollView>
      <BottomTab />
    </>
  );
}
