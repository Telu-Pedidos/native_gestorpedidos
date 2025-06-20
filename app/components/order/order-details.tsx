import { View, ScrollView } from "react-native";
import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import {
  UserIcon,
  LockIcon,
  CalendarIcon,
  ChevronDownIcon,
  Edit2Icon,
} from "lucide-react-native";
import { OrderResponse } from "@/app/models/order";
import { Status } from "@/app/validations/order-validation";
import {
  formatDateNew,
  formatDateToDays,
  isSameDate,
} from "@/app/helpers/date";
import {
  formatNumberToHex,
  transformNameDelivery,
} from "@/app/utils/functions";
import { renderClientName } from "@/app/utils/client-name";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { OrderDelete } from "./order-delete";
import { renderStatusText, statusStylesRN } from "./order-utils";
import { formatPrice } from "@/app/utils/format-price";
import { useState } from "react";
import useOrders from "@/app/hooks/useOrders";
import useNewToast from "@/app/hooks/useNewToast";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

type OrderDetailsProps = {
  order: OrderResponse;
  status: Status;
  fetchOrders: () => Promise<void>;
  onClose: () => void;
  navigation?: NavigationProps;
};

export function OrderDetails({
  order,
  status,
  fetchOrders,
  onClose,
  navigation,
}: OrderDetailsProps) {
  const styles = statusStylesRN[status];

  const [isOpen, setIsOpen] = useState(false);
  const { handleNewStatusOrder, handleFinishOrder } = useOrders({
    id: String(order.id),
    navigation,
  });
  const { toast } = useNewToast();

  const nextStatusMap: Record<Status, Status | null> = {
    PENDING: "ACCEPTED",
    ACCEPTED: "PREPARATION",
    PREPARATION: "COMPLETED",
    COMPLETED: null,
  };

  const nextStatus = nextStatusMap[status];

  const handleAdvanceStatus = async () => {
    try {
      if (!nextStatus) return;
      if (nextStatus === "COMPLETED") {
        await handleFinishOrder(String(order.id));
      } else {
        await handleNewStatusOrder(String(order.id), nextStatus);
      }
      fetchOrders();
      setIsOpen(false);
    } catch (err) {
      toast({ title: "Erro ao alterar status", variant: "error" });
    }
  };

  const handleNavigateToOrderEdit = (order: OrderResponse) => {
    if (!navigation) return;
    navigation.navigate("OrderEdit", { order });
    onClose();
  };

  return (
    <AlertDialogContent className="rounded-md bg-white px-0">
      <AlertDialogHeader className="mb-6 px-4">
        <View>
          <Heading className="text-typography-950 text-lg font-semibold">
            Pedido {formatNumberToHex(order.id)}
          </Heading>
          <Text className="text-sm text-muted-foreground">
            Recebido há {formatDateToDays(order.startAt)}
          </Text>
        </View>
        <View
          className="flex-row items-center gap-1 rounded-md px-4 py-2"
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
      </AlertDialogHeader>

      <AlertDialogBody>
        <ScrollView className="max-h-[300px] px-4">
          <View className="mb-4 flex flex-col gap-1">
            <View className="flex-row items-center gap-2">
              <UserIcon size={18} color="#605E48" />
              <Text className="text-sm text-[#605E48]">
                {renderClientName(order.client?.name)}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <LockIcon size={18} color="#605E48" />
              <Text className="text-sm text-[#605E48]">
                {transformNameDelivery(order.delivery)}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <CalendarIcon size={18} color="#605E48" />
              <Text className="text-sm text-[#605E48]">
                {formatDateNew(order.startAt)} -{" "}
                {formatDateToDays(order.startAt)}
              </Text>
            </View>
            {order?.endAt && isSameDate(order.startAt, order.endAt) && (
              <View className="flex-row items-center gap-2">
                <CalendarIcon size={18} color="red" />
                <Text className="text-sm text-destructive">
                  Concluir até{" "}
                  <Text className="font-bold">
                    {formatDateNew(order.endAt)}
                  </Text>
                </Text>
              </View>
            )}
            {order?.observation && (
              <View className="mt-6">
                <Text className="font-semibold">Observação:</Text>
                <Text className="mt-1 text-sm text-muted-foreground">
                  {order.observation}
                </Text>
              </View>
            )}
          </View>
          <View className="flex flex-row items-end justify-end">
            <Text className="text-base font-medium">
              Total: {formatPrice(order.total ?? 0)}
            </Text>
          </View>
        </ScrollView>
      </AlertDialogBody>

      <AlertDialogFooter className="mt-6 flex flex-col items-baseline gap-4">
        {nextStatus && (
          <View className="w-full border-b border-b-border px-4 pb-4">
            <Button
              onPress={handleAdvanceStatus}
              className="w-full bg-primary px-4 text-primary-foreground"
            >
              <ButtonText style={{ color: styles.text.color }} className="px-4">
                {nextStatus === "ACCEPTED" && "Aceitar pedido"}
                {nextStatus === "PREPARATION" && "Começar preparo"}
                {nextStatus === "COMPLETED" && "Concluir pedido"}
              </ButtonText>
            </Button>
          </View>
        )}

        <View className="flex w-full flex-row items-center justify-end gap-2 px-4">
          <Button
            onPress={() => handleNavigateToOrderEdit(order)}
            className="bg-secondary"
          >
            <Edit2Icon size={14} className="text-foreground" />
            <ButtonText className="text-sm text-foreground">Editar</ButtonText>
          </Button>

          <OrderDelete id={order.id} fetchOrders={fetchOrders} />
        </View>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
