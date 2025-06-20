import { BottomTab } from "@/app/components/bottom-tab";
import ProductForm from "@/app/components/product/product-form";
import { View } from "react-native";

export default function ProductRegisterScreen() {
  return (
    <>
      <View className="flex min-h-full flex-col gap-10 bg-white p-4">
        <ProductForm />
      </View>
      <BottomTab />
    </>
  );
}
