import { FlatList, View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { Edit2Icon } from "lucide-react-native";
import { formatDateNew } from "@/app/helpers/date";
import { CategoryResponse } from "@/app/models/category";
import { CategoryDelete } from "./category-delete";

type CategoriesFlatListProps = {
  data: CategoryResponse[];
  fetchData: () => Promise<void>;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function CategoriesFlatList({
  data,
  fetchData,
}: CategoriesFlatListProps) {
  const navigation = useNavigation<NavigationProps>();

  const handleNavigateToCategoryEdit = (category: CategoryResponse) => {
    navigation.navigate("CategoryEdit", { category });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 150, paddingTop: 20, gap: 16 }}
      renderItem={({ item: category }) => (
        <View className="rounded-xl border border-border bg-white py-4 shadow">
          <View className="mb-4 flex flex-row flex-wrap items-start justify-between gap-2 border-b border-b-border px-4 py-4">
            <View className="flex flex-col gap-2">
              <Text className="mb-2 text-xl font-bold">{category.name}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Button
                onPress={() => handleNavigateToCategoryEdit(category)}
                className="flex flex-row items-center gap-2 rounded-md bg-secondary px-2 py-1"
              >
                <Edit2Icon size={14} className="text-foreground" />
                <ButtonText className="text-sm text-foreground">
                  Editar
                </ButtonText>
              </Button>
              <CategoryDelete
                name={category.name}
                id={category.id}
                fetchData={fetchData}
              />
            </View>
          </View>

          <View className="p-4">
            <Text>Id: {category.id}</Text>
            <Text>Nome: {category.name}</Text>
            <Text>
              Modificado em:{" "}
              {category.updatedAt ? formatDateNew(category.updatedAt) : "-"}
            </Text>
          </View>
        </View>
      )}
    />
  );
}
