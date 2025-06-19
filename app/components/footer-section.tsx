import React from "react";
import { View } from "react-native";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

const currentYear = new Date().getFullYear();

export function FooterSection() {
  return (
    <>
      <View className="mt-12 items-center justify-center space-y-1 px-6">
        <Image
          size="sm"
          source={{
            uri: "https://ik.imagekit.io/hijykdr24/telupedidos/logo.png?updatedAt=1746369517720",
          }}
          alt="Logo Télu Personalizados"
          className="rounded-full"
        />
        <Text className="text-sm font-semibold text-foreground">
          Télu Personalizados
        </Text>
        <Text className="text-center text-sm text-muted-foreground">
          Personalizados para sua comemoração!
        </Text>
        <Text className="mt-4 text-center text-xs text-muted-foreground">
          © {currentYear}. Todos os direitos reservados.
        </Text>
      </View>
    </>
  );
}
