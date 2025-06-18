import { View, Text, TouchableOpacity } from "react-native";
import {
  OrderUtilsProps,
  renderStatusIcon,
  renderStatusText,
  statusStyles,
} from "./order-utils";
import { Status } from "@/app/validations/order-validation";

type OrderStatusProps = OrderUtilsProps & {
  orderSize: number;
  selectedStatus?: Status;
};

export default function OrderStatus({
  status,
  setActiveStatus,
  activeStatus,
  orderSize,
  selectedStatus = "PENDING",
}: OrderStatusProps) {
  const styles = statusStyles[status];
  const isActive = selectedStatus && status === activeStatus;

  const handleStatusChange = () => {
    setActiveStatus(status);
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center gap-2 rounded border p-1 ${styles.border} ${styles.background} ${
        isActive
          ? "opacity-100"
          : "border-inherit bg-inherit opacity-60 transition-opacity hover:opacity-80"
      }`}
      onPress={handleStatusChange}
    >
      <View
        className={`flex size-6 items-center justify-center rounded-full shadow-sm ${styles.iconBg}`}
      >
        {renderStatusIcon(status)}
      </View>

      <View className="flex-row items-center gap-2 text-sm font-semibold text-order">
        <Text className="hidden sm:block">{renderStatusText(status)}</Text>

        {orderSize > 0 && (
          <View
            className={`flex size-4 items-center justify-center rounded-full bg-destructive text-xs font-normal text-white ${styles.border} ${styles.background}`}
          >
            <Text>{orderSize}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
