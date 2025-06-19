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
import {
  CategoryFormValues,
  categorySchema,
} from "@/app/validations/category-validation";
import { CategoryResponse } from "@/app/models/category";
import useCategories from "@/app/hooks/useCategories";

type ModelFormProps = {
  category?: CategoryResponse;
  id?: number;
};

export default function CategoryForm({ category, id }: ModelFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  const { onSubmit, isPending, handleCancel } = useCategories({
    id: String(id),
  });

  return (
    <VStack className="w-full gap-5">
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
                placeholder="Nome da categoria"
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
