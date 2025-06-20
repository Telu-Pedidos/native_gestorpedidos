import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { UploadIcon } from "lucide-react-native";
import getModels from "@/app/actions/model/get-models";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { ModelResponse } from "@/app/models/model";
import { Header } from "@/app/components/header";
import { ModelsFlatList } from "@/app/components/model/model-flatlist";
import { ButtonRegister } from "@/app/components/button-register";
import { BottomTab } from "@/app/components/bottom-tab";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function ModelsScreen() {
  const [models, setModels] = useState<ModelResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigation = useNavigation<NavigationProps>();

  const fetchModels = async () => {
    const { data } = await getModels();
    setModels(data?.reverse() ?? []);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleNavigateToCreate = () => {
    navigation.navigate("ModelRegister");
  };

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Header />

      <ScrollView className="w-full max-w-full rounded-md border-b border-b-border bg-card px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="border-b-2 border-b-primary text-3xl font-medium text-title">
            Modelos
          </Text>

          <View className="text-sm font-medium">
            <Text className="mb-1 text-[#666358]">Total de modelos</Text>
            <Text className="text-title">{models.length}</Text>
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

        {models.length > 0 && (
          <ModelsFlatList data={filteredModels} fetchData={fetchModels} />
        )}
      </ScrollView>

      <ButtonRegister handleAction={handleNavigateToCreate} />
      <BottomTab />
    </>
  );
}
