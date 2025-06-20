import { Text, View, TextInput, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { Header } from "@/app/components/header";
import { ButtonRegister } from "@/app/components/button-register";
import { CategoryResponse } from "@/app/models/category";
import getCategories from "@/app/actions/category/get-categories";
import { CategoriesFlatList } from "@/app/components/category/category-flatlist";
import { BottomTab } from "@/app/components/bottom-tab";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigation = useNavigation<NavigationProps>();

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data?.reverse() ?? []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNavigateToCreate = () => {
    navigation.navigate("CategoryRegister");
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Header />

      <ScrollView className="w-full max-w-full rounded-md border-b border-b-border bg-card px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="border-b-2 border-b-primary text-3xl font-medium text-title">
            Categorias
          </Text>

          <View className="text-sm font-medium">
            <Text className="mb-1 text-[#666358]">Total de categorias</Text>
            <Text className="text-title">{categories.length}</Text>
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

        {categories.length > 0 && (
          <CategoriesFlatList
            data={filteredCategories}
            fetchData={fetchCategories}
          />
        )}
      </ScrollView>

      <ButtonRegister handleAction={handleNavigateToCreate} />
      <BottomTab />
    </>
  );
}
