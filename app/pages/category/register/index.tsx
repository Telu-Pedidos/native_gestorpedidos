import CategoryForm from "@/app/components/category/category-form";
import { View, Text } from "react-native";

export default function CategoryRegisterScreen() {
  return (
    <View className="flex min-h-full flex-col gap-10 bg-white p-4">
      <CategoryForm />
    </View>
  );
}
