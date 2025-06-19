import useNewToast from "./useNewToast";
import createCategory from "@/app/actions/category/create-category";
import editCategory from "@/app/actions/category/edit-category";
import getCategories from "@/app/actions/category/get-categories";
import { CategoryResponse } from "@/app/models/category";
import { CategoryFormValues } from "@/app/validations/category-validation";
import { useEffect, useState, useTransition } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Model">;

export default function useCategories({ id }: { id?: string }) {
  const { toast } = useNewToast();
  const navigation = useNavigation<NavigationProps>();

  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<CategoryResponse[]>();

  const getAllCategories = () => {
    startTransition(async () => {
      try {
        const result = await getCategories();
        if (result.ok) {
          setCategories(result.data);
        } else {
          console.error(result.error || "Erro ao buscar as categorias");
        }
      } catch (error) {
        toast({ title: "Erro ao buscar as categorias.", variant: "error" });
        console.error(error);
      }
    });
  };

  const handleCreateCategory = async (data: CategoryFormValues) => {
    try {
      const result = await createCategory(data);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao cadastrar a categoria.",
        variant: "error",
      });
    }
  };

  const handleEditCategory = async (data: CategoryFormValues) => {
    if (!id) {
      return;
    }

    try {
      const result = await editCategory(data, id);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao alterar a categoria.",
        variant: "error",
      });
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    startTransition(async () => {
      try {
        if (id) {
          await handleEditCategory(data);
        } else {
          await handleCreateCategory(data);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  };

  const handleCancel = () => {
    navigation.navigate("Categories");
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return {
    handleCreateCategory,
    handleEditCategory,
    handleCancel,
    onSubmit,
    isPending,
    categories,
  };
}
