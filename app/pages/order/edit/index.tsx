import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/models/navigation";
import { useEffect, useState, useTransition } from "react";
import LoadingComponent from "@/app/components/loading";
import { BottomTab } from "@/app/components/bottom-tab";
import { OrderResponse } from "@/app/models/order";
import getOrderId from "@/app/actions/order/get-order-id";
import OrderForm from "@/app/components/order/order-form";

type Props = RouteProp<RootStackParamList, "OrderEdit">;

export default function OrderEditScreen() {
  const { params } = useRoute<Props>();
  const {
    order: { id },
  } = params;

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchOrder = async () => {
      startTransition(async () => {
        try {
          const response = await getOrderId({ id: String(id) });
          setOrder(response.data);
        } catch (error) {
          console.error("Erro ao buscar pedido:", error);
        }
      });
    };

    fetchOrder();
  }, [id]);

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <View className="flex min-h-full flex-col gap-10 bg-white p-4">
          {order && <OrderForm order={order} id={String(id)} />}
        </View>
      )}

      <BottomTab />
    </>
  );
}
