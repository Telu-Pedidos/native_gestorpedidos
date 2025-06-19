import { View, Text } from "react-native";
import ClientForm from "@/app/components/client/client-form";

export default function ClientRegisterScreen() {
  return (
    <View className="flex min-h-full flex-col gap-10 bg-white p-4">
      <ClientForm />
    </View>
  );
}
