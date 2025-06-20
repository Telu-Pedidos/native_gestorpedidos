import { FlatList, View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { Edit2Icon } from "lucide-react-native";
import { ModelResponse } from "@/app/models/model";
import { formatDateNew } from "@/app/helpers/date";
import { Image } from "@/components/ui/image";
import { IMAGE } from "@/app/utils/image";
import { ModelDelete } from "./model-delete";
// import { ClientDelete } from "./client-delete";

type ModelsFlatListProps = {
  data: ModelResponse[];
  fetchData: () => Promise<void>;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function ModelsFlatList({ data, fetchData }: ModelsFlatListProps) {
  const navigation = useNavigation<NavigationProps>();

  const handleNavigateToModelEdit = (model: ModelResponse) => {
    navigation.navigate("ModelEdit", { model });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 150, gap: 16 }}
      renderItem={({ item: model }) => (
        <View className="rounded-xl border border-border bg-white py-4 shadow">
          <View className="mb-4 flex flex-row flex-wrap items-start justify-between gap-2 border-b border-b-border px-4 py-4">
            <View className="flex flex-col gap-2">
              <Image
                size="sm"
                className="rounded-full object-cover"
                source={{
                  uri: model.imageUrl || IMAGE.PreviewImage,
                }}
                alt={model.name}
              />
              <Text className="mb-2 text-xl font-bold">{model.name}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Button
                onPress={() => handleNavigateToModelEdit(model)}
                className="flex flex-row items-center gap-2 rounded-md bg-secondary px-2 py-1"
              >
                <Edit2Icon size={16} className="text-foreground" />
                <ButtonText className="text-sm text-foreground">
                  Editar
                </ButtonText>
              </Button>
              <ModelDelete
                name={model.name}
                id={model.id}
                fetchData={fetchData}
              />
            </View>
          </View>

          <View className="p-4">
            <Text>Id: {model.id}</Text>
            <Text>Nome: {model.name}</Text>
            <Text>
              Modificado em:{" "}
              {model.updatedAt ? formatDateNew(model.updatedAt) : "-"}
            </Text>
          </View>
        </View>
      )}
    />
  );
}
