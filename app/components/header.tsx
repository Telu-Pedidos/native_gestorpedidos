import React, { useState } from "react";
import { Modal, TouchableOpacity, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MenuIcon, XIcon, LogOutIcon } from "lucide-react-native";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import logout from "@/app/actions/auth/logout";
import useNewToast from "@/app/hooks/useNewToast";
import { Pressable } from "@/components/ui/pressable";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

interface MenuLink {
  id: string;
  name: string;
  href: keyof RootStackParamList;
}

export function Header() {
  const navigation = useNavigation<NavigationProps>();
  const [visible, setVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useNewToast();

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await logout();
    } catch (err) {
      toast({
        title: "Erro ao deslogar.",
        variant: "error",
      });
    } finally {
      setIsPending(false);
      setVisible(false);
    }
  };

  return (
    <>
      <VStack className="border border-border bg-background px-4 py-2">
        <HStack className="items-center justify-between">
          <Pressable onPress={() => navigation.navigate("Home")}>
            <HStack className="items-center" space="md">
              <Image
                size="sm"
                source={{
                  uri: "https://ik.imagekit.io/hijykdr24/telupedidos/logo.png?updatedAt=1746369517720",
                }}
                className="h-14 w-14"
                alt="Logo Télu"
              />
              <Text className="text-base font-semibold text-primary-foreground">
                Télu Pedidos
              </Text>
              <Pressable onPress={handleLogout}>Sair</Pressable>
            </HStack>
          </Pressable>
        </HStack>
      </VStack>
    </>
  );
}
