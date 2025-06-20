import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/models/navigation";
import { useEffect, useState, useTransition } from "react";
import LoadingComponent from "@/app/components/loading";
import { CategoryResponse } from "@/app/models/category";
import getCategoryId from "@/app/actions/category/get-category-id";
import CategoryForm from "@/app/components/category/category-form";
import { BottomTab } from "@/app/components/bottom-tab";

type Props = RouteProp<RootStackParamList, "CategoryEdit">;

export default function CategoryEditScreen() {
  const { params } = useRoute<Props>();
  const {
    category: { id },
  } = params;

  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchCategory = async () => {
      startTransition(async () => {
        try {
          const response = await getCategoryId({ id: String(id) });
          setCategory(response.data);
        } catch (error) {
          console.error("Erro ao buscar categoria:", error);
        }
      });
    };

    fetchCategory();
  }, [id]);

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <View className="flex min-h-full flex-col gap-10 bg-white p-4">
          {category && <CategoryForm category={category} id={id} />}
        </View>
      )}
      <BottomTab />
    </>
  );
}
