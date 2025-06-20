import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, ScrollView, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";

import {
  OrderFormValues,
  orderSchema,
  deliveryuses,
  statuses,
} from "@/app/validations/order-validation";
import useOrders from "@/app/hooks/useOrders";
import useClients from "@/app/hooks/useClients";
import useProducts from "@/app/hooks/useProducts";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { OrderResponse } from "@/app/models/order";
import { TextInputMask } from "react-native-masked-text";
import { transformNameDelivery } from "@/app/utils/functions";

type OrderFormProps = {
  order?: OrderResponse;
  id?: string;
};

export default function OrderForm({ order, id }: OrderFormProps) {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      total: order?.total || 0,
      clientId: order?.clientId,
      delivery: order?.delivery || "SHOPEE",
      status: order?.status || "PENDING",
      observation: order?.observation || "",
      productIds: order?.productIds || [],
      startAt: order?.startAt || new Date().toISOString(),
      endAt: order?.endAt || new Date().toISOString(),
    },
  });

  const { clients } = useClients({ id });
  const { products } = useProducts({ id });
  const { onSubmit, handleCancel, isPending } = useOrders({ id });

  const [openClient, setOpenClient] = useState(false);
  const [clientItems, setClientItems] = useState(
    clients?.map((c) => ({ label: c.name, value: c.id })) || [],
  );

  const [openDelivery, setOpenDelivery] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    if (clients && clients.length > 0) {
      setClientItems(clients.map((c) => ({ label: c.name, value: c.id })));
    }
  }, [clients]);

  return (
    <ScrollView>
      <View className="mb-20 w-full gap-5 px-4">
        <Controller
          control={form.control}
          name="clientId"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error}>
              <FormControlLabel>
                <FormControlLabelText>Cliente</FormControlLabelText>
              </FormControlLabel>
              <DropDownPicker
                open={openClient}
                listMode="MODAL"
                value={field.value}
                items={clientItems}
                setOpen={setOpenClient}
                setItems={setClientItems}
                setValue={(callbackOrValue) => {
                  const value =
                    typeof callbackOrValue === "function"
                      ? callbackOrValue(field.value)
                      : callbackOrValue;
                  field.onChange(value);
                }}
                placeholder="Selecione o cliente..."
                zIndex={3000}
                zIndexInverse={1000}
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
                modalTitle="Selecione o cliente"
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
          name="total"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error} className="gap-1">
              <FormControlLabel>
                <FormControlLabelText className="text-base font-medium text-[#595548]">
                  Total
                </FormControlLabelText>
              </FormControlLabel>
               {" "}
              <TextInputMask
                type="money"
                options={{
                  precision: 2,
                  separator: ",",
                  delimiter: ".",
                  unit: "R$ ",
                }}
                value={(field.value as any) ?? 0}
                onChangeText={(formatted, raw) => {
                  let valueToProcess = raw;

                  if (raw === undefined || raw === null || raw === "") {
                    const cleanedFormatted = formatted
                      .replace("R$", "")
                      .replace(/\./g, "")
                      .replace(",", ".")
                      .trim();
                    valueToProcess = cleanedFormatted;
                  }

                  let numeric = 0;
                  if (valueToProcess) {
                    const sanitizedValue = valueToProcess
                      .replace(/[^\d.,]/g, "")
                      .replace(",", ".");
                    numeric = Number(sanitizedValue);
                  }
                  field.onChange(isNaN(numeric) ? 0 : numeric);
                }}
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
          name="delivery"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error}>
              <FormControlLabel>
                <FormControlLabelText>Entrega</FormControlLabelText>
              </FormControlLabel>
              <DropDownPicker
                open={openDelivery}
                listMode="MODAL"
                value={field.value}
                items={deliveryuses.map((d) => ({
                  label: transformNameDelivery(d),
                  value: d,
                }))}
                setOpen={setOpenDelivery}
                setValue={(callbackOrValue) => {
                  const value =
                    typeof callbackOrValue === "function"
                      ? callbackOrValue(field.value)
                      : callbackOrValue;

                  field.onChange(value);
                }}
                placeholder="Selecione o tipo de entrega..."
                zIndex={3000}
                zIndexInverse={1000}
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
                modalTitle="Selecione o Tipo de Entrega"
              />
              {fieldState.error && (
                <FormControlErrorText className="text-destructive">
                  {fieldState.error.message}{" "}
                </FormControlErrorText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={form.control}
          name="status"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error}>
              <FormControlLabel>
                <FormControlLabelText>Status</FormControlLabelText>
              </FormControlLabel>
              <DropDownPicker
                open={openStatus}
                listMode="MODAL"
                value={field.value}
                items={statuses.map((status) => ({
                  label:
                    status === "PENDING"
                      ? "Pendente"
                      : status === "ACCEPTED"
                        ? "Aceito"
                        : status === "PREPARATION"
                          ? "Em preparo"
                          : "Concluído",
                  value: status,
                }))}
                setOpen={setOpenStatus}
                setValue={(callbackOrValue) => {
                  const value =
                    typeof callbackOrValue === "function"
                      ? callbackOrValue(field.value)
                      : callbackOrValue;
                  field.onChange(value);
                }}
                setItems={() => {}}
                placeholder="Selecione o status..."
                zIndex={3000}
                zIndexInverse={1000}
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
                modalTitle="Selecione o status"
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
          name="observation"
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error}>
              <FormControlLabel>
                <FormControlLabelText>Observação</FormControlLabelText>
              </FormControlLabel>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Digite sua observação..."
                value={field.value}
                onChangeText={field.onChange}
                className="min-h-20 rounded-md border border-gray-300 p-2 text-base text-[#595548]"
              />
              {fieldState.error && (
                <FormControlErrorText className="text-destructive">
                  {fieldState.error.message}
                </FormControlErrorText>
              )}
            </FormControl>
          )}
        />

        <VStack className="mt-4 gap-4">
          <Button
            onPress={form.handleSubmit(onSubmit)}
            isDisabled={isPending}
            className="h-14 border border-primary bg-primary"
          >
            <ButtonText className="text-base font-medium">
              {id ? "Alterar" : "Criar"}
            </ButtonText>
          </Button>
          <Button
            onPress={handleCancel}
            isDisabled={isPending}
            className="h-14 border border-border bg-secondary"
          >
            <ButtonText className="text-base font-medium">Cancelar</ButtonText>
          </Button>
        </VStack>
      </View>
    </ScrollView>
  );
}
