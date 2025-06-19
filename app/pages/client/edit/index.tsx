import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/models/navigation";
import getClientId from "@/app/actions/client/get-client-id";
import ClientForm from "@/app/components/client/client-form";
import { useEffect, useState, useTransition } from "react";
import { ClientResponse } from "@/app/models/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoadingComponent from "@/app/components/loading";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type Props = RouteProp<RootStackParamList, "ClientEdit">;

export default function ClientEditScreen() {
  const { params } = useRoute<Props>();
  const {
    client: { id },
  } = params;

  const [client, setClient] = useState<ClientResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchClient = async () => {
      startTransition(async () => {
        try {
          const response = await getClientId({ id });

          setClient(response.data);
        } catch (error) {
          console.error("Erro ao buscar cliente:", error);
        }
      });
    };

    fetchClient();
  }, [id]);

  if (isPending) {
    return <LoadingComponent />;
  }

  return (
    <View className="flex min-h-full flex-col gap-10 bg-white p-4">
      {client && <ClientForm client={client} id={id} />}
    </View>
  );
}
