import { StyleSheet, View } from "react-native";

// components
import { Image } from "@/components/ui/image";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#FEBE1E]">
      <Image
        size="2xl"
        source={{
          uri: "https://ik.imagekit.io/hijykdr24/telupedidos/logo.png?updatedAt=1746369517720",
        }}
        alt="Logo Télu Personalizados"
        className="aspect-[320/208] w-full max-w-[320px]"
      />
    </View>
  );
}
