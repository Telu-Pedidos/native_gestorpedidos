import { OrderResponse } from "@/app/models/order";
import OrderStatus from "./order-status";
import { statuses, Status } from "@/app/validations/order-validation";
import { ScrollView } from "react-native";

type OrderStatusManagerProps = {
  orders: OrderResponse[] | null;
  activeStatus: Status | null;
  setActiveStatus: (status: Status | null) => void;
};

export default function OrderStatusManager({
  orders,
  activeStatus,
  setActiveStatus,
}: OrderStatusManagerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, marginTop: 32 }}
    >
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
    </ScrollView>
  );
}
