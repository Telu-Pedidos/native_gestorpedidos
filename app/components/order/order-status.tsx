import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  OrderUtilsProps,
  renderStatusIcon,
  renderStatusText,
  statusStyles,
  statusStylesRN,
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
  const styles = statusStylesRN[status];
  const isActive = selectedStatus && status === activeStatus;

  const handleStatusChange = () => {
    setActiveStatus(status);
  };

  return (
    <TouchableOpacity
      style={[
        stylesWrapper.container,
        styles.border,
        styles.background,
        !isActive && stylesWrapper.inactive,
      ]}
      onPress={handleStatusChange}
    >
      <View
        className={`flex size-6 flex-row items-center justify-center rounded-full ${styles.iconBg}`}
      >
        {renderStatusIcon({ status, iconColor: styles.iconBg.backgroundColor })}
      </View>

      <View className="flex-row items-center gap-2 text-sm font-semibold text-order">
        <Text className="text-xs text-foreground">
          {renderStatusText(status)}
        </Text>

        {orderSize > 0 && (
          <View
            className={`mx-auto flex size-4 items-center justify-center rounded-full bg-destructive text-xs font-normal text-white ${styles.background}`}
          >
            <Text className="flex flex-row items-center justify-center text-center text-xs text-white">
              {orderSize}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const stylesWrapper = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 6,
    borderWidth: 1,
    padding: 4,
  },
  inactive: {
    opacity: 0.6,
  },
});
