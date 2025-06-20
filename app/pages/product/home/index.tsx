import { Text, View, TextInput, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { Header } from "@/app/components/header";
import { ButtonRegister } from "@/app/components/button-register";
import { ProductResponse } from "@/app/models/product";
import getProducts from "@/app/actions/product/get-products";
import { ProductsFlatList } from "@/app/components/product/product-flatlist";
import { BottomTab } from "@/app/components/bottom-tab";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function ProductsScreen() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigation = useNavigation<NavigationProps>();

  const fetchProducts = async () => {
    const { data } = await getProducts();
    setProducts(data?.reverse() ?? []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNavigateToCreate = () => {
    navigation.navigate("ProductRegister");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Header />

      <ScrollView className="w-full max-w-full rounded-md border-b border-b-border bg-card px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="border-b-2 border-b-primary text-3xl font-medium text-title">
            Produtos
          </Text>

          <View className="text-sm font-medium">
            <Text className="mb-1 text-[#666358]">Total de produtos</Text>
            <Text className="text-title">{products.length}</Text>
          </View>
        </View>

        <View className="mb-4">
          <TextInput
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="h-12 rounded border border-gray-300 px-3"
          />
        </View>

        {products.length > 0 && (
          <ProductsFlatList data={filteredProducts} fetchData={fetchProducts} />
        )}
      </ScrollView>

      <ButtonRegister handleAction={handleNavigateToCreate} />

      <BottomTab />
    </>
  );
}
