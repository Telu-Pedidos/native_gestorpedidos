import { useState, useTransition, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { timeZone } from "@/app/helpers/date";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { OrderFormValues, Status } from "@/app/validations/order-validation";

import newStatusOrder from "@/app/actions/order/new-status-order";
import finishOrder from "@/app/actions/order/finish-order";
import createOrder from "@/app/actions/order/create-order";
import editOrder from "@/app/actions/order/edit-order";
import useNewToast from "./useNewToast";
import { RootStackParamList } from "../models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function useOrders({ id }: { id?: string }) {
  const { toast } = useNewToast();
  const [activeStatus, setActiveStatus] = useState<Status | null>(null);
  const [isPending, startTransition] = useTransition();
  const navigation = useNavigation<NavigationProps>();

  const handleNewStatusOrder = useCallback(
    async (orderId: string, newStatus: Status) => {
      try {
        await newStatusOrder({ id: orderId, newStatus });
        toast({
          title: "Status do pedido atualizado com sucesso!",
          variant: "success",
        });
      } catch (error) {
        console.error("Erro ao atualizar status:", error);
        toast({
          title: "Erro ao atualizar status do pedido.",
          variant: "error",
        });
      }
    },
    [toast],
  );

  const handleFinishOrder = useCallback(
    async (orderId: string) => {
      try {
        await finishOrder(orderId);
        toast({ title: "Pedido finalizado com sucesso!", variant: "success" });
      } catch (error) {
        console.error("Erro ao finalizar pedido:", error);
        toast({ title: "Erro ao finalizar o pedido.", variant: "error" });
      }
    },
    [toast],
  );

  const handleCreateOrder = useCallback(
    async (data: OrderFormValues) => {
      try {
        const result = await createOrder(data);
        if (!result.ok) {
          toast({ title: result.error, variant: "error" });
          return;
        }
        toast({ title: "Pedido cadastrado com sucesso!", variant: "success" });
        navigation.navigate("Orders");
      } catch (error) {
        toast({ title: "Erro ao cadastrar o pedido.", variant: "error" });
      }
    },
    [navigation, toast],
  );

  const handleEditOrder = useCallback(
    async (data: OrderFormValues, orderId: string) => {
      try {
        const result = await editOrder(data, orderId);
        if (!result.ok) {
          toast({ title: result.error, variant: "error" });
          return;
        }
        toast({ title: "Pedido editado com sucesso!", variant: "success" });
      } catch (error) {
        toast({ title: "Erro ao editar o pedido.", variant: "error" });
      }
    },
    [toast],
  );

  const onSubmit = useCallback(
    async (data: OrderFormValues) => {
      startTransition(async () => {
        try {
          const startAt = toZonedTime(parseISO(data.startAt), timeZone);
          const endAt = toZonedTime(parseISO(data.endAt), timeZone);

          const formattedStartAt = format(startAt, "yyyy-MM-dd'T'HH:mm:ssXXX");
          const formattedEndAt = format(endAt, "yyyy-MM-dd'T'HH:mm:ssXXX");

          const payload = {
            ...data,
            startAt: formattedStartAt,
            endAt: formattedEndAt,
          };

          if (id) {
            await handleEditOrder(payload, id);
          } else {
            await handleCreateOrder(payload);
          }
        } catch (error) {
          console.error("Erro no onSubmit:", error);
          toast({
            title: "Ocorreu um erro ao processar o pedido.",
            variant: "error",
          });
        }
      });
    },
    [id, handleEditOrder, handleCreateOrder, toast],
  );

  const handleCancel = useCallback(() => {
    navigation.navigate("Orders");
  }, [navigation]);

  return {
    activeStatus,
    setActiveStatus,
    handleNewStatusOrder,
    handleFinishOrder,
    onSubmit,
    isPending,
    handleCancel,
  };
}
