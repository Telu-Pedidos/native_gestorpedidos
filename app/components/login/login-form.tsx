import {
  LoginFormValues,
  loginSchema,
} from "@/app/validations/login-validation";
import { IconGoogle } from "@/components/icons/IconGoogle";
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
import useLogin from "@/app/hooks/useLogin";

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const { onSubmit, isPending } = useLogin();

  return (
    <VStack className="w-full gap-5">
      <Controller
        control={control}
        name="login"
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error} className="gap-1">
            <FormControlLabel>
              <FormControlLabelText className="text-sm font-medium text-[#595548]">
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1 h-14 border-[#DDDBD0]">
              <InputField
                placeholder="Entre com seu e-mail"
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
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error} className="gap-1">
            <FormControlLabel>
              <FormControlLabelText className="text-sm font-medium text-[#595548]">
                Senha
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1 h-14 border-[#DDDBD0]">
              <InputField
                placeholder="••••••••"
                type="password"
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
          onPress={handleSubmit(onSubmit)}
          isDisabled={isPending}
        >
          <ButtonText className="text-base font-medium">
            {isPending ? "Entrando..." : "Entrar"}
          </ButtonText>
        </Button>
        <Button
          className="h-14 flex-row items-center justify-center border border-border bg-transparent"
          size="sm"
          isDisabled
        >
          <IconGoogle size={20} />
          <ButtonText className="ml-2 text-base font-medium">
            Entre com o Google
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
