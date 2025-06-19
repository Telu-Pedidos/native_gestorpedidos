import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useModels from "@/app/hooks/useModels";
import { ModelResponse } from "@/app/models/model";
import {
  ModelFormValues,
  modelSchema,
} from "@/app/validations/model-validation";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { View } from "react-native";
import { CameraIcon } from "lucide-react-native";

type ModelFormProps = {
  model?: ModelResponse;
  id?: number;
};

export default function ModelForm({ model, id }: ModelFormProps) {
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      name: model?.name || "",
      imageUrl: model?.imageUrl || "",
      file: model?.file || undefined,
    },
  });

  const { onSubmit, handleCancel, isPending, selectedFile } = useModels({
    id: String(id),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    model?.imageUrl ?? null,
  );

  const handlePickImage = async (onChange: (file: any) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar as fotos foi negada.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPreviewImage(asset.uri);
      onChange(asset);
    }
  };

  return (
    <VStack className="w-full gap-5">
      <Controller
        control={form.control}
        name="file"
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error} className="gap-2">
            <FormControlLabel>
              <FormControlLabelText className="text-base font-medium text-[#595548]">
                Foto do modelo
              </FormControlLabelText>
            </FormControlLabel>

            <Pressable
              className="relative h-48 w-48 items-center justify-center overflow-hidden rounded-lg bg-muted"
              onPress={() => handlePickImage(field.onChange)}
            >
              {previewImage ? (
                <Image
                  source={{ uri: previewImage }}
                  className="h-full w-full object-contain"
                />
              ) : (
                <View className="h-full w-full items-center justify-center">
                  <CameraIcon size={32} className="text-[#999]" />
                </View>
              )}

              <View className="absolute inset-0 items-center justify-center bg-black/50">
                <CameraIcon size={32} className="text-white" />
              </View>
            </Pressable>

            {fieldState.error && (
              <FormControlErrorText className="text-destructive">
                {fieldState.error.message}
              </FormControlErrorText>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error} className="gap-1">
            <FormControlLabel>
              <FormControlLabelText className="text-base font-medium text-[#595548]">
                Nome
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              isDisabled={isPending}
              className="my-1 h-14 border-[#DDDBD0]"
            >
              <InputField
                placeholder="Nome do modelo"
                onChangeText={field.onChange}
                value={field.value}
              />
            </Input>
            {fieldState.error && (
              <FormControlErrorText className="text-destructive">
                {fieldState.error.message}
              </FormControlErrorText>
            )}
          </FormControl>
        )}
      />

      <VStack className="gap-4">
        <Button
          className="h-14 border border-primary bg-primary"
          size="sm"
          onPress={form.handleSubmit(onSubmit)}
          isDisabled={isPending}
        >
          {id ? (
            <ButtonText className="text-base font-medium">Alterar</ButtonText>
          ) : (
            <ButtonText className="text-base font-medium">Salvar</ButtonText>
          )}
        </Button>
        <Button
          className="h-14 flex-row items-center justify-center border border-border bg-secondary"
          size="sm"
          isDisabled={isPending}
          onPress={handleCancel}
        >
          <ButtonText className="ml-2 text-base font-medium">
            Cancelar
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
