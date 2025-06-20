import { useState } from "react";
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
import { UserIcon, LockIcon, CalendarIcon } from "lucide-react-native";
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
import useOrders from "@/app/hooks/useOrders";
import useNewToast from "@/app/hooks/useNewToast";

type OrderDetailsProps = {
  order: OrderResponse;
  status: Status;
  fetchOrders: () => Promise<void>;
  onClose: () => void;
};

export function OrderDetails({
  order,
  status,
  fetchOrders,
  onClose,
}: OrderDetailsProps) {
  // const [isOpen, setIsOpen] = useState(false);
  // const { handleNewStatusOrder, handleFinishOrder } = useOrders({
  //   id: String(order.id),
  // });
  // const { toast } = useNewToast();

  // const nextStatusMap: Record<Status, Status | null> = {
  //   PENDING: "ACCEPTED",
  //   ACCEPTED: "PREPARATION",
  //   PREPARATION: "COMPLETED",
  //   COMPLETED: null,
  // };

  // const nextStatus = nextStatusMap[status];

  // const handleAdvanceStatus = async () => {
  //   try {
  //     if (!nextStatus) return;
  //     if (nextStatus === "COMPLETED") {
  //       await handleFinishOrder(String(order.id));
  //     } else {
  //       await handleNewStatusOrder(String(order.id), nextStatus);
  //     }
  //     fetchOrders();
  //     setIsOpen(false);
  //   } catch (err) {
  //     toast({ title: "Erro ao alterar status", variant: "error" });
  //   }
  // };

  return (
    <AlertDialogContent className="rounded-md bg-white">
      <AlertDialogHeader>
        <Heading className="text-typography-950 text-lg font-semibold">
          Pedido {formatNumberToHex(order.id)}
        </Heading>
        <Text className="text-sm text-muted-foreground">
          Recebido há {formatDateToDays(order.startAt)}
        </Text>
      </AlertDialogHeader>

      <AlertDialogBody>
        <ScrollView className="max-h-[300px]">
          <View className="mb-4 space-y-2">
            <View className="flex-row items-center gap-2">
              <UserIcon size={18} color="#605E48" />
              <Text className="font-medium text-[#605E48]">
                {renderClientName(order.client?.name)}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <LockIcon size={18} color="#605E48" />
              <Text className="font-medium text-[#605E48]">
                {transformNameDelivery(order.delivery)}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <CalendarIcon size={18} color="#605E48" />
              <Text className="text-sm text-[#605E48]">
                Início: {formatDateNew(order.startAt)}
              </Text>
            </View>
            {order?.endAt && !isSameDate(order.startAt, order.endAt) && (
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
              <View className="mt-4">
                <Text className="font-semibold">Observação:</Text>
                <Text className="mt-1 text-sm text-muted-foreground">
                  {order.observation}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </AlertDialogBody>

      <AlertDialogFooter className="mt-4 gap-2">
        <Button action="secondary" className="bg-secondary" onPress={onClose}>
          <ButtonText className="text-foreground">Fechar</ButtonText>
        </Button>

        {/* {nextStatus && (
          <Button onPress={handleAdvanceStatus} className="bg-primary">
            <ButtonText className="text-white">
              {nextStatus === "ACCEPTED" && "Aceitar pedido"}
              {nextStatus === "PREPARATION" && "Começar preparo"}
              {nextStatus === "COMPLETED" && "Concluir pedido"}
            </ButtonText>
          </Button>
        )} */}
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
