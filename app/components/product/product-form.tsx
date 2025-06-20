import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, ScrollView } from "react-native";
import { CameraIcon } from "lucide-react-native";
import { TextInputMask } from "react-native-masked-text";

import {
  ProductFormValues,
  productSchema,
} from "@/app/validations/product-validation";
import useProducts from "@/app/hooks/useProducts";
import useCategories from "@/app/hooks/useCategories";
import useModels from "@/app/hooks/useModels";
import { ProductResponse } from "@/app/models/product";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

type ProductFormProps = {
  product?: ProductResponse;
  id?: string;
};

export default function ProductForm({ product, id }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      categoryId: product?.categoryId,
      modelId: product?.modelId,
      imageUrl: product?.imageUrl || "",
      file: product?.file || undefined,
    },
  });

  const { categories } = useCategories({ id });
  const { models } = useModels({ id });
  const { onSubmit, handleCancel, isPending } = useProducts({ id });

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryItems, setCategoryItems] = useState(
    categories?.map((cat) => ({ label: cat.name, value: cat.id })) || [],
  );

  const [previewImage, setPreviewImage] = useState<string | null>(
    product?.imageUrl ?? null,
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

  const [openModel, setOpenModel] = useState(false);
  const [modelItems, setModelItems] = useState(
    models?.map((model) => ({ label: model.name, value: model.id })) || [],
  );

  useEffect(() => {
    if (models) {
      setModelItems(
        models.map((model) => ({
          label: model.name,
          value: model.id,
        })),
      );
    }
  }, [models]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoryItems(
        categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        })),
      );
    }
  }, [categories]);

  return (
    <ScrollView>
      <View className="mb-20 w-full gap-5">
        <Controller
          control={form.control}
          name="file"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error} className="gap-2">
              <FormControlLabel>
                <FormControlLabelText className="text-base font-medium text-[#595548]">
                  Foto do produto
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
                  placeholder="Nome do produto"
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

        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error} className="gap-1">
              <FormControlLabel>
                <FormControlLabelText className="text-base font-medium text-[#595548]">
                  Preço
                </FormControlLabelText>
              </FormControlLabel>
              <TextInputMask
                type="money"
                options={{
                  precision: 2,
                  separator: ",",
                  delimiter: ".",
                  unit: "R$ ",
                }}
                value={field.value as any}
                onChangeText={(formatted, raw) => field.onChange(raw)}
                editable={!isPending}
                style={{
                  height: 56,
                  borderColor: "#DDDBD0",
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                }}
              />
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
          name="categoryId"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error} className="gap-1">
              <FormControlLabel>
                <FormControlLabelText className="text-base font-medium text-[#595548]">
                  Categoria
                </FormControlLabelText>
              </FormControlLabel>
              <DropDownPicker
                open={openCategory}
                listMode="MODAL"
                value={field.value as any}
                items={categoryItems}
                setOpen={setOpenCategory}
                setValue={field.onChange}
                setItems={setCategoryItems}
                placeholder="Selecione a categoria..."
                zIndex={3000}
                zIndexInverse={1000}
                disabled={isPending}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E0E0E0",
                  borderRadius: 8,
                  minHeight: 50,
                }}
                listItemLabelStyle={{
                  fontSize: 16,
                  color: "#1F1500",
                }}
                selectedItemContainerStyle={{
                  backgroundColor: "#ffc60a",
                }}
                modalTitle="Selecione a categoria"
              />
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
          name="modelId"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error} className="gap-1">
              <FormControlLabel>
                <FormControlLabelText className="text-base font-medium text-[#595548]">
                  Modelo
                </FormControlLabelText>
              </FormControlLabel>

              <DropDownPicker
                open={openModel}
                listMode="MODAL"
                value={field.value as any}
                items={modelItems}
                setOpen={setOpenModel}
                setValue={field.onChange}
                setItems={setModelItems}
                placeholder="Selecione o modelo..."
                zIndex={2000}
                zIndexInverse={900}
                disabled={isPending}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E0E0E0",
                  borderRadius: 8,
                  minHeight: 50,
                }}
                listItemLabelStyle={{
                  fontSize: 16,
                  color: "#1F1500",
                }}
                selectedItemContainerStyle={{
                  backgroundColor: "#ffc60a",
                }}
                modalTitle="Selecione a categoria"
              />

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
            <ButtonText className="text-base font-medium">
              {id ? "Alterar" : "Salvar"}
            </ButtonText>
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
      </View>
    </ScrollView>
  );
}
