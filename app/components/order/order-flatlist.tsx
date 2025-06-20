import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { OrderResponse } from "@/app/models/order";
import useOrders from "@/app/hooks/useOrders";
import { useState } from "react";
import { Status } from "@/app/validations/order-validation";
import { OrderCard } from "./order-card";
import { statusStylesRN } from "./order-utils";

type OrdersFlatListProps = {
  data: OrderResponse[];
  fetchData: () => Promise<void>;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function OrdersFlatList({ data, fetchData }: OrdersFlatListProps) {
  const navigation = useNavigation<NavigationProps>();
  const { handleNewStatusOrder, handleFinishOrder } = useOrders({});
  const [activeStatus, setActiveStatus] = useState<Status | null>(null);

  const modifyStatusOrder = (id: string, newStatus: Status) => {
    setActiveStatus(newStatus);
    if (newStatus === "COMPLETED") {
      handleFinishOrder(id);
      return;
    }
    handleNewStatusOrder(id, newStatus);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 150, paddingTop: 20, gap: 16 }}
      renderItem={({ item: order }) => {
        const status = order.status as Status;
        const styles = statusStylesRN[status];

        return <OrderCard key={order.id} fetchData={fetchData} order={order} />;
      }}
    />
  );
}
