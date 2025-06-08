import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import LoginForm from "@/app/components/login/login-form";

export default function LoginScreen() {
  return (
    <VStack className="flex-1 items-center gap-12 rounded-lg bg-background px-3 pt-16">
      <Image
        size="xl"
        source={{
          uri: "https://ik.imagekit.io/hijykdr24/telupedidos/logo.png?updatedAt=1746369517720",
        }}
        alt="Logo Télu Personalizados"
      />

      <VStack className="items-center gap-3">
        <Text size="4xl" className="font-bold">
          Faça seu login
        </Text>
        <Text size="md" className="text-muted-foreground">
          Bem vindo de volta! Por favor, insira seus dados.
        </Text>
      </VStack>

      <LoginForm />
    </VStack>
  );
}
