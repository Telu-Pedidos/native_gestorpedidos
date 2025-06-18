import { OrderResponse } from "@/app/models/order";
import OrderStatus from "./order-status";
import useOrders from "@/app/hooks/useOrders";
import { statuses } from "@/app/validations/order-validation";
import { View } from "react-native";

export default function OrderStatusManager({
  orders,
}: {
  orders: OrderResponse[] | null;
}) {
  const { activeStatus, setActiveStatus } = useOrders({});

  return (
    <View className="clock:flex-nowrap flex flex-wrap gap-3">
      {statuses.map((orderStatus) => {
        const activeOrdersData =
          orders?.filter((order) => order.status === orderStatus) ?? [];

        const activerOrdersSize = activeOrdersData?.length ?? 0;

        return (
          <OrderStatus
            key={orderStatus}
            status={orderStatus}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
            orderSize={activerOrdersSize}
          />
        );
      })}
    </View>
  );
}
