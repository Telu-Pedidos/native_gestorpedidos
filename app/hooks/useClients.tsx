import createClient from "@/app/actions/client/create-client";
import editClient from "@/app/actions/client/edit-client";
import getClients from "@/app/actions/client/get-clients";
import { ClientResponse } from "@/app/models/client";
import { ClientFormValues } from "@/app/validations/client-validation";
import { useEffect, useState, useTransition } from "react";
import useNewToast from "./useNewToast";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/navigation";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Client">;

export default function useClients({ id }: { id?: string }) {
  const { toast } = useNewToast();
  const [isPending, startTransition] = useTransition();
  const [clients, setClients] = useState<ClientResponse[]>();

  const navigation = useNavigation<NavigationProps>();

  const getAllClients = () => {
    startTransition(async () => {
      try {
        const result = await getClients();
        if (result.ok) {
          setClients(result.data);
        } else {
          console.error(result.error || "Erro ao buscar os clientes");
        }
      } catch (error) {
        toast({ title: "Erro ao buscar os clientes.", variant: "error" });
        console.error(error);
      }
    });
  };

  const handleCreateClient = async (data: ClientFormValues) => {
    try {
      const result = await createClient(data);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      navigation.navigate("Clients");
    } catch (error) {
      toast({
        title: "Ocorreu um erro ao cadastrar o cliente.",
        variant: "error",
      });
    }
  };

  const handleEditClient = async (data: ClientFormValues) => {
    if (!id) {
      return;
    }

    try {
      const result = await editClient(data, id);
      if (!result.ok) {
        toast({
          title: result.error,
          variant: "error",
        });
        return;
      }
      navigation.navigate("Clients");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao alterar o cliente.",
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    navigation.navigate("Clients");
  };

  const onSubmit = async (data: ClientFormValues) => {
    startTransition(async () => {
      try {
        if (id) {
          await handleEditClient(data);
        } else {
          await handleCreateClient(data);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  };

  useEffect(() => {
    getAllClients();
  }, []);

  return {
    handleCreateClient,
    handleEditClient,
    handleCancel,
    onSubmit,
    isPending,
    clients,
  };
}
