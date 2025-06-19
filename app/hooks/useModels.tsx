import createModel from "@/app/actions/model/create-model";
import editModel from "@/app/actions/model/edit-model";
import getModels from "@/app/actions/model/get-models";
import { ModelResponse } from "@/app/models/model";
import { ModelFormValues } from "@/app/validations/model-validation";
import { useEffect, useState, useTransition } from "react";
import useNewToast from "./useNewToast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/navigation";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Model">;

export default function useModels({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useNewToast();
  const [models, setModels] = useState<ModelResponse[]>();

  const navigation = useNavigation<NavigationProps>();

  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getAllModels = () => {
    startTransition(async () => {
      try {
        const result = await getModels();
        if (result.ok) {
          setModels(result.data);
        } else {
          console.error(result.error || "Erro ao buscar os modelos");
        }
      } catch (error) {
        toast({ title: "Erro ao buscar os modelos.", variant: "error" });
        console.error(error);
      }
    });
  };

  const onSubmit = async (modelData: ModelFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        // if (modelData.file) {
        //   formData.append("file", modelData.file);

        //   const imageData = await uploadImage(formData);

        //   const newImageUrl = imageData.url;

        //   if (!newImageUrl) {
        //     throw new Error("Erro ao obter a URL da imagem");
        //   }

        //   modelData.imageUrl = newImageUrl;
        // }

        if (id) {
          await handleEditModel(modelData);
        } else {
          await handleCreateModel(modelData);
        }
      } catch (error) {
        console.error("Erro:", error);
        toast({
          title: "Ocorreu um erro ao salvar o modelo.",
          variant: "error",
        });
      }
    });
  };

  const handleCreateModel = async (data: ModelFormValues) => {
    const { file, ...newData } = data;

    try {
      const result = await createModel(newData);
      if (!result.ok) {
        toast({
          title: result.error,
          variant: "error",
        });
        return;
      }
      toast({
        title: "Modelo cadastrado com sucesso!",
        variant: "success",
      });
      navigation.navigate("Models");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao cadastrar o modelo.",
        variant: "error",
      });
    }
  };

  const handleEditModel = async (data: ModelFormValues) => {
    if (!id) {
      navigation.navigate("Models");
      return;
    }

    const { file, ...newData } = data;

    try {
      const result = await editModel(newData, id);
      if (!result.ok) {
        toast({
          title: result.error,
          variant: "error",
        });
        return;
      }
      toast({
        title: "Modelo alterado com sucesso!",
        variant: "success",
      });
      navigation.navigate("Models");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast({
        title: "Ocorreu um erro ao alterar o modelo.",
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    navigation.navigate("Models");
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    getAllModels();
  }, []);

  return {
    handleCreateModel,
    handleEditModel,
    handleCancel,
    handleImageChange,
    onSubmit,
    isPending,
    models,
    previewImage,
    selectedFile,
  };
}
