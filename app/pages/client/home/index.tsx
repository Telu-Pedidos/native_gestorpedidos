import { Text, View, TextInput, ScrollView } from "react-native";
import getClients from "@/app/actions/client/get-clients";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { ClientResponse } from "@/app/models/client";
import { ClientsFlatList } from "../../../components/client/client-flatlist";
import { Header } from "@/app/components/header";
import { ButtonRegister } from "@/app/components/button-register";
import { BottomTab } from "@/app/components/bottom-tab";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function ClientsScreen() {
  const [clients, setClients] = useState<ClientResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Header />

      <ScrollView className="w-full max-w-full rounded-md border-b border-b-border bg-card px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="border-b-2 border-b-primary text-3xl font-medium text-title">
            Clientes
          </Text>

          <View className="text-sm font-medium">
            <Text className="mb-1 text-[#666358]">Total de clientes</Text>
            <Text className="text-title">{clients.length}</Text>
          </View>
        </View>

        <View>
          <TextInput
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="h-12 rounded border border-gray-300 px-3"
          />
        </View>

        {clients.length > 0 && (
          <ClientsFlatList data={filteredClients} fetchData={fetchClients} />
        )}
      </ScrollView>

      <ButtonRegister handleAction={handleNavigateToCreate} />
      <BottomTab />
    </>
  );
}
