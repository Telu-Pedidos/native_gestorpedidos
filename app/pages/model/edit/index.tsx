import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/models/navigation";
import { useEffect, useState, useTransition } from "react";
import LoadingComponent from "@/app/components/loading";
import getModelId from "@/app/actions/model/get-model-id";
import { ModelResponse } from "@/app/models/model";
import ModelForm from "@/app/components/model/model-form";
import { BottomTab } from "@/app/components/bottom-tab";

type Props = RouteProp<RootStackParamList, "ModelEdit">;

export default function ModelEditScreen() {
  const { params } = useRoute<Props>();
  const {
    model: { id },
  } = params;

  const [model, setModel] = useState<ModelResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchModel = async () => {
      startTransition(async () => {
        try {
          const response = await getModelId({ id: String(id) });
          setModel(response.data);
        } catch (error) {
          console.error("Erro ao buscar modelo:", error);
        }
      });
    };

    fetchModel();
  }, [id]);

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <View className="flex min-h-full flex-col gap-10 bg-white p-4">
          {model && <ModelForm model={model} id={id} />}
        </View>
      )}

      <BottomTab />
    </>
  );
}
