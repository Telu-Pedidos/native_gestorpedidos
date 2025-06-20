import { Pressable, View, Text } from "react-native";
import {
  ChevronDownIcon,
  LockIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react-native";
import {
  formatDateNew,
  formatDateToDays,
  isSameDate,
} from "@/app/helpers/date";
import { formatPrice } from "@/app/utils/format-price";
import { AlertDialog, AlertDialogBackdrop } from "@/components/ui/alert-dialog";
import {
  formatNumberToHex,
  transformNameDelivery,
} from "@/app/utils/functions";
import { renderClientName } from "@/app/utils/client-name";
import { OrderResponse } from "@/app/models/order";
import { Status } from "@/app/validations/order-validation";
import { useState } from "react";
import { OrderDetails } from "./order-details";
import { renderStatusText, statusStylesRN } from "./order-utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { useNavigation } from "@react-navigation/native";

type Props = {
  order: OrderResponse;
  fetchData: () => Promise<void>;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function OrderCard({ order, fetchData }: Props) {
  const navigation = useNavigation<NavigationProps>();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const status = order.status as Status;
  const styles = statusStylesRN[status];
  const handleClose = () => setShowAlertDialog(false);

  return (
    <>
      <Pressable
        onPress={() => setShowAlertDialog(true)}
        className="rounded-xl border border-border bg-white shadow"
      >
        <View className="flex flex-row items-center justify-between border-b border-b-border px-4 pb-2 pt-4">
          <Text className="text-base font-semibold text-[#000]">
            {formatNumberToHex(order.id)}
          </Text>
          <View
            className="flex-row items-center gap-1 rounded-md px-2 py-1"
            style={{
              backgroundColor: styles.background.backgroundColor,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{
                color: styles.text.color,
              }}
            >
              {renderStatusText(status)}
            </Text>
            <ChevronDownIcon size={14} color={styles.text.color} />
          </View>
        </View>

        <View className="flex flex-col gap-2 px-4 py-3">
          <View className="flex flex-row items-center gap-2">
            <UserIcon size={18} color="#605E48" />
            <Text className="text-sm font-medium text-[#605E48]">
              {renderClientName(order.client?.name)}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <LockIcon size={18} color="#605E48" />
            <Text className="text-sm font-medium text-[#605E48]">
              {transformNameDelivery(order.delivery)}
            </Text>
          </View>

          {order?.endAt && !isSameDate(order?.startAt, order?.endAt) && (
            <View className="flex flex-row items-center gap-2">
              <CalendarIcon size={16} color="#e11d48" />
              <Text className="text-xs text-destructive">
                Concluir até{" "}
                <Text className="font-semibold">
                  {formatDateNew(order.endAt)}
                </Text>
              </Text>
            </View>
          )}
        </View>

        <View className="flex flex-row items-center justify-between px-4 pb-4">
          <Text className="text-sm text-[#9F947F]">
            Recebido há {formatDateToDays(order.startAt)}
          </Text>
          <Text className="text-base font-semibold">
            {formatPrice(order.total || 0)}
          </Text>
        </View>
      </Pressable>

      <AlertDialog
        isOpen={showAlertDialog}
        onClose={handleClose}
        size="full"
        className="bg-black/60 px-2 py-1"
      >
        <AlertDialogBackdrop />
        <OrderDetails
          order={order}
          status={order.status}
          fetchOrders={fetchData}
          onClose={handleClose}
          navigation={navigation}
        />
      </AlertDialog>
    </>
  );
}
