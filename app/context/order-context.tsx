import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import createOrder from "@/app/actions/order/create-order";
import editOrder from "@/app/actions/order/edit-order";
import newStatusOrder from "@/app/actions/order/new-status-order";
import { OrderFormValues, Status } from "@/app/validations/order-validation";
import finishOrder from "@/app/actions/order/finish-order";
import useNewToast from "@/app/hooks/useNewToast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Order">;

interface OrderContextProps {
  activeStatus: Status | null;
  setActiveStatus: Dispatch<
    SetStateAction<"PENDING" | "ACCEPTED" | "PREPARATION" | "COMPLETED" | null>
  >;
  handleNewStatusOrder: (id: string, newStatus: Status) => Promise<void>;
  handleFinishOrder: (id: string) => Promise<void>;
  onSubmit: (data: OrderFormValues, id?: string) => Promise<void>;
  isPending: boolean;
  handleCancel: () => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined,
);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeStatus, setActiveStatus] = useState<Status | null>(null);
  const [isPending, startTransition] = useTransition();
  const navigation = useNavigation<NavigationProps>();
  const { toast } = useNewToast();

  const handleNewStatusOrder = async (id: string, newStatus: Status) => {
    try {
      await newStatusOrder({ id, newStatus });
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao tentar atualizar o status.",
        variant: "error",
      });
    }
  };

  const handleFinishOrder = async (id: string) => {
    try {
      await finishOrder(id);
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao tentar finalizar o pedido.",
        variant: "error",
      });
    }
  };

  const handleCreateOrder = async (data: OrderFormValues) => {
    try {
      const result = await createOrder(data);
      if (!result.ok) {
        toast({
          title: result.error,
          variant: "error",
        });
        return;
      }
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao cadastrar o pedido.",
        variant: "error",
      });
    }
  };

  const handleEditOrder = async (data: OrderFormValues, id: string) => {
    try {
      const result = await editOrder(data, id);
      if (!result.ok) {
        toast({
          title: result.error,
          variant: "error",
        });
        return;
      }
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao alterar o pedido.",
        variant: "error",
      });
    }
  };

  const onSubmit = async (data: OrderFormValues, id?: string) => {
    startTransition(async () => {
      try {
        if (id) {
          await handleEditOrder(data, id);
        } else {
          await handleCreateOrder(data);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  };

  const handleCancel = () => {
    navigation.navigate("Home");
  };

  return (
    <OrderContext.Provider
      value={{
        activeStatus,
        setActiveStatus,
        handleNewStatusOrder,
        handleFinishOrder,
        onSubmit,
        isPending,
        handleCancel,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
