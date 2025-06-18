import { Text, View, TouchableOpacity } from "react-native";
import { UploadIcon } from "lucide-react-native";
import getClients from "@/app/actions/client/get-clients";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { ClientResponse } from "@/app/models/client";
import { ClientsFlatList } from "../../../components/clients/client-flatlist";
import { Header } from "@/app/components/header";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function ClientsScreen() {
  const [clients, setClients] = useState<ClientResponse[]>([]);
  const navigation = useNavigation<NavigationProps>();

  const fetchClients = async () => {
    const { data } = await getClients();
    setClients(data?.reverse() ?? []);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleNavigateToCreate = () => {
    navigation.navigate("ClientRegister");
  };

  return (
    <>
      <Header />

      <View className="w-full max-w-full rounded-md border-b border-b-border bg-card px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="border-b-2 border-b-primary text-3xl font-medium text-title">
            Clientes
          </Text>

          <View className="text-sm font-medium">
            <Text className="mb-1 text-[#666358]">Total de clientes</Text>
            <Text className="text-title">{clients.length}</Text>
          </View>
        </View>

        <View className="mb-4 flex w-full">
          <TouchableOpacity
            onPress={handleNavigateToCreate}
            className="flex-row items-center justify-center gap-2 rounded bg-primary px-6 py-3 text-primary-foreground"
          >
            <UploadIcon size={18} className="text-primary-foreground" />
            <Text className="font-medium text-primary-foreground">
              Cadastrar Cliente
            </Text>
          </TouchableOpacity>
        </View>

        {clients.length > 0 && (
          <ClientsFlatList clients={clients} fetchClients={fetchClients} />
        )}
      </View>
    </>
  );
}
