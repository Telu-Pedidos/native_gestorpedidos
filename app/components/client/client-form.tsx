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
  ClientFormValues,
  clientSchema,
} from "@/app/validations/client-validation";
import { ClientResponse } from "@/app/models/client";
import useClients from "@/app/hooks/useClients";
import { formatPhoneNumberInput } from "@/app/helpers/phone";

type ClientFormProps = {
  client?: ClientResponse;
  id?: string;
};

export default function ClientForm({ client, id }: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      address: client?.address || "",
      phone: client?.phone || "",
    },
  });

  const { onSubmit, handleCancel, isPending } = useClients({ id });

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
                placeholder="Nome do cliente"
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
        name="phone"
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error} className="gap-1">
            <FormControlLabel>
              <FormControlLabelText className="text-base font-medium text-[#595548]">
                Telefone
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              isDisabled={isPending}
              className="my-1 h-14 border-[#DDDBD0]"
            >
              <InputField
                placeholder="(XX) XXXXX-XXXX"
                keyboardType="phone-pad"
                value={field.value}
                onChangeText={(text) => {
                  const formatted = formatPhoneNumberInput(text);
                  field.onChange(formatted);
                }}
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
        name="email"
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error} className="gap-1">
            <FormControlLabel>
              <FormControlLabelText className="text-base font-medium text-[#595548]">
                E-mail
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              isDisabled={isPending}
              className="my-1 h-14 border-[#DDDBD0]"
            >
              <InputField
                placeholder="Email do cliente"
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
        name="address"
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error} className="gap-1">
            <FormControlLabel>
              <FormControlLabelText className="text-base font-medium text-[#595548]">
                Endereço
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              isDisabled={isPending}
              className="my-1 h-14 border-[#DDDBD0]"
            >
              <InputField
                placeholder="Endereço do cliente"
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
