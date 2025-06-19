import ModelForm from "@/app/components/model/model-form";
import { View, Text } from "react-native";

export default function ModelRegisterScreen() {
  return (
    <View className="flex min-h-full flex-col gap-10 bg-white p-4">
      <ModelForm />
    </View>
  );
}
