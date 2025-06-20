import OrderForm from "@/app/components/order/order-form";
import { View } from "react-native";

export default function OrderRegisterScreen() {
  return (
    <View className="flex min-h-full flex-col gap-10 bg-white p-4">
      <OrderForm />
    </View>
  );
}
