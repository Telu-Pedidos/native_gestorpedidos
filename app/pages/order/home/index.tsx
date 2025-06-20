import { Text, View, TextInput, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { Header } from "@/app/components/header";
import { ButtonRegister } from "@/app/components/button-register";
import { OrderResponse } from "@/app/models/order";
import getOrders from "@/app/actions/order/get-orders";
import { OrdersFlatList } from "@/app/components/order/order-flatlist";
import OrderStatusManager from "@/app/components/order/order-status-manager";
import useOrders from "@/app/hooks/useOrders";
import { Status } from "@/app/validations/order-validation";
import { BottomTab } from "@/app/components/bottom-tab";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function OrdersScreen() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigation = useNavigation<NavigationProps>();

  const { activeStatus, setActiveStatus } = useOrders({});

  const fetchOrders = async () => {
    const { data } = await getOrders();
    setOrders(data?.reverse() ?? []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleNavigateToCreate = () => {
    navigation.navigate("OrderRegister");
  };

  const filteredOrders = useMemo(() => {
    let currentOrders = orders;

    if (activeStatus) {
      currentOrders = currentOrders.filter(
        (order) => order.status === activeStatus,
      );
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentOrders = currentOrders.filter(
        (order) =>
          order.client?.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
          order.observation?.toLowerCase().includes(lowerCaseSearchTerm) ||
          String(order.id).toLowerCase().includes(lowerCaseSearchTerm),
      );
    }

    return currentOrders;
  }, [orders, activeStatus, searchTerm]);

  return (
    <>
      <Header />

      <ScrollView className="w-full max-w-full rounded-md border-b border-b-border bg-card px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="border-b-2 border-b-primary text-3xl font-medium text-title">
            Pedidos
          </Text>

          <View className="text-sm font-medium">
            <Text className="mb-1 text-[#666358]">Total de pedidos</Text>
            <Text className="text-title">{orders.length}</Text>
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

        <OrderStatusManager
          orders={orders}
          activeStatus={activeStatus as Status | null}
          setActiveStatus={setActiveStatus}
        />

        {filteredOrders.length > 0 ? (
          <OrdersFlatList data={filteredOrders} fetchData={fetchOrders} />
        ) : (
          <Text className="mt-4 text-center text-gray-500">
            Nenhum pedido encontrado com este filtro.
          </Text>
        )}
      </ScrollView>

      <ButtonRegister handleAction={handleNavigateToCreate} />

      <BottomTab />
    </>
  );
}
