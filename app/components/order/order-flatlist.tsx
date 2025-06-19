import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { OrderResponse } from "@/app/models/order";
import {
  formatNumberToHex,
  transformNameDelivery,
} from "@/app/utils/functions";
import {
  LockIcon,
  UserIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "lucide-react-native";
import { renderClientName } from "@/app/utils/client-name";
import {
  formatDateNew,
  formatDateToDays,
  isSameDate,
} from "@/app/helpers/date";
import { formatPrice } from "@/app/utils/format-price";
import {
  renderStatusText,
  statusStylesCard,
} from "@/app/components/order/order-utils";
import useOrders from "@/app/hooks/useOrders";
import { useState } from "react";
import { Status } from "@/app/validations/order-validation";
import { OrderDetails } from "./order-details";
import { OrderCard } from "./order-card";

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
        const styles = statusStylesCard[status];

        return <OrderCard key={order.id} fetchData={fetchData} order={order} />;
      }}
    />
  );
}
