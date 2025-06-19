import { useEffect, useState, useTransition } from "react";
import { ProductFormValues } from "@/app/validations/product-validation";
import createProduct from "@/app/actions/product/create-product";
import editProduct from "@/app/actions/product/edit-product";
import getProducts from "@/app/actions/product/get-products";
import { ProductResponse } from "@/app/models/product";
import useNewToast from "./useNewToast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Product">;

export default function useProducts({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useNewToast();

  const navigation = useNavigation<NavigationProps>();

  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [products, setProducts] = useState<ProductResponse[]>();

  const getAllProducts = () => {
    startTransition(async () => {
      try {
        const result = await getProducts();
        if (result.ok) {
          setProducts(result.data);
        } else {
          console.error(result.error || "Erro ao buscar os produtos");
        }
      } catch (error) {
        toast({ title: "Erro ao buscar os produtos.", variant: "error" });
        console.error(error);
      }
    });
  };

  const onSubmit = async (productData: ProductFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        // if (productData.file) {
        //   formData.append("file", productData.file);
        //   const imageData = await uploadImage(formData);
        //   const newImageUrl = imageData.url;

        //   if (!newImageUrl) {
        //     throw new Error("Erro ao obter a URL da imagem");
        //   }

        //   productData.imageUrl = newImageUrl;
        // }

        if (id) {
          await handleEditProduct(productData);
        } else {
          await handleCreateProduct(productData);
        }
      } catch (error) {
        console.error("Erro:", error);
        toast({
          title: "Ocorreu um erro ao salvar o produto.",
          variant: "error",
        });
      }
    });
  };

  const handleCreateProduct = async (data: ProductFormValues) => {
    const { file, ...newData } = data;

    try {
      const result = await createProduct(newData);
      if (!result.ok) {
        toast({
          title: result.error,
          variant: "error",
        });
        return;
      }
      navigation.navigate("Products");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao cadastrar o produto.",
        variant: "error",
      });
    }
  };

  const handleEditProduct = async (data: ProductFormValues) => {
    if (!id) {
      navigation.navigate("Products");
      return;
    }

    const { file, ...newData } = data;

    try {
      const result = await editProduct(newData, id);
      if (!result.ok) {
        toast({
          title: result.error,
          variant: "error",
        });
        return;
      }
      navigation.navigate("Products");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao alterar o produto.",
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    navigation.navigate("Products");
  };
  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    onSubmit,
    selectedFile,
    handleImageChange,
    previewImage,
    handleCancel,
    isPending,
    products,
  };
}
