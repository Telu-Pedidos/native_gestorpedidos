import { FlatList, View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { Edit2Icon } from "lucide-react-native";
import { formatDateNew } from "@/app/helpers/date";
import { Image } from "@/components/ui/image";
import { IMAGE } from "@/app/utils/image";
import { ProductResponse } from "@/app/models/product";
import { ProductDelete } from "./product-delete";
import { formatPrice } from "@/app/utils/format-price";
import ProductState from "./product-state";

type ProductsFlatListProps = {
  data: ProductResponse[];
  fetchData: () => Promise<void>;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function ProductsFlatList({ data, fetchData }: ProductsFlatListProps) {
  const navigation = useNavigation<NavigationProps>();

  const handleNavigateToProductEdit = (product: ProductResponse) => {
    navigation.navigate("ProductEdit", { product });
  };

  console.log(data[0]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 150, paddingTop: 20, gap: 16 }}
      renderItem={({ item: product }) => (
        <View className="rounded-xl border border-border bg-white py-4 shadow">
          <View className="mb-4 flex flex-row flex-wrap items-start justify-between gap-2 border-b border-b-border px-4 py-4">
            <View className="flex flex-col gap-2">
              <Image
                size="md"
                className="rounded-full object-cover"
                source={{
                  uri: product.imageUrl || IMAGE.PreviewImage,
                }}
                alt={product.name}
              />
              <View className="mb-2 flex flex-row items-center gap-1">
                <Text className="text-xl font-bold">{product.name} - </Text>
                <Text className="text-xl font-bold">
                  {formatPrice(product.price)}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Button
                onPress={() => handleNavigateToProductEdit(product)}
                className="flex flex-row items-center gap-2 rounded-md bg-secondary px-2 py-1"
              >
                <Edit2Icon size={14} className="text-foreground" />
                <ButtonText className="text-sm text-foreground">
                  Editar
                </ButtonText>
              </Button>
              <ProductDelete
                name={product.name}
                id={product.id}
                fetchData={fetchData}
              />
            </View>
          </View>

          <View className="p-4">
            <Text>Categoria: {product.category?.name}</Text>
            <Text>Modelo: {product.model?.name}</Text>
            <Text>
              Modificado em:{" "}
              {product.updatedAt ? formatDateNew(product.updatedAt) : "-"}
            </Text>
            <View className="flex flex-row items-center">
              <Text>Estado: </Text>
              <ProductState active={product.active} id={String(product.id)} />
            </View>
          </View>
        </View>
      )}
    />
  );
}
