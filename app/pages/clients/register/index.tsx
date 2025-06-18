import { View, Text } from "react-native";
import ClientForm from "@/app/components/clients/client-form";

export default function ClientRegisterScreen() {
  return (
    <View className="flex min-h-full flex-col gap-10 bg-white p-4">
      <Text className="border-b-2 border-b-primary text-3xl font-medium text-title">
        Adicionar Cliente
      </Text>
      <ClientForm />
    </View>
  );
}
