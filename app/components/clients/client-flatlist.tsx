import { FlatList, View, Text, Linking } from "react-native";
import { ClientResponse } from "@/app/models/client";
import { formatPhoneNumber, regexPhoneNumber } from "@/app/helpers/phone";
import { formatDateToDays } from "@/app/helpers/date";
import {
  getLastDateOrder,
  getTotalSpentOrder,
} from "../../functions/client-functions";
import { Button, ButtonText } from "@/components/ui/button";
import { IconWhatsapp } from "@/app/components/icons/IconWhatsapp";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { formatPrice } from "@/app/utils/format-price";
import { Edit2Icon } from "lucide-react-native";
import { ClientDelete } from "./client-delete";

type ClientsFlatListProps = {
  clients: ClientResponse[];
  fetchClients: () => Promise<void>;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function ClientsFlatList({
  clients,
  fetchClients,
}: ClientsFlatListProps) {
  const navigation = useNavigation<NavigationProps>();

  const handleNavigateToClientEdit = (client: ClientResponse) => {
    console.log("direciou para o editar");
    navigation.navigate("ClientEdit", { client });
  };

  const handlePressWhatsapp = (phone: string | undefined) => {
    const formatted = regexPhoneNumber(phone || "-");
    const url = `https://wa.me/${formatted}`;
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o WhatsApp:", err),
    );
  };

  return (
    <FlatList
      data={clients}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 200 }}
      renderItem={({ item: client }) => (
        <View className="rounded-xl border border-border bg-white py-4 shadow">
          <View className="mb-4 flex flex-row items-center justify-between gap-2 border-b border-b-border px-4 py-4">
            <Text className="mb-2 text-xl font-bold">{client.name}</Text>
            <View className="flex flex-row items-center gap-2">
              <Button
                onPress={() => handleNavigateToClientEdit(client)}
                className="flex flex-row items-center gap-2 rounded-md bg-secondary px-4 py-2"
              >
                <Edit2Icon size={16} className="text-foreground" />
                <ButtonText className="text-foreground">Editar</ButtonText>
              </Button>
              <ClientDelete
                name={client.name}
                id={client.id}
                fetchClients={fetchClients}
              />
            </View>
          </View>

          <View className="p-4">
            <Text>
              Telefone: {formatPhoneNumber(client.phone || "") || "-"}
            </Text>
            <Text>Cliente há: {formatDateToDays(client.createdAt)}</Text>
            <Text>
              Último pedido:{" "}
              {formatDateToDays(getLastDateOrder(client) || "") || "-"}
            </Text>
            <Text>Total de pedidos: {client.orders?.length ?? 0}</Text>
            <Text>Total gasto: {formatPrice(getTotalSpentOrder(client))}</Text>
            <View className="mt-6 w-full flex-col justify-end gap-2">
              <Button
                onPress={() => handlePressWhatsapp(client.phone)}
                className="w-full rounded-md bg-[#3CAF47]"
              >
                <IconWhatsapp size={16} />
                <ButtonText className="text-[#fff]">Mensagem</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      )}
    />
  );
}
