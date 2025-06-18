import login from "@/app/actions/auth/login";
import { useTransition } from "react";
import { LoginFormValues } from "@/app/validations/login-validation";
import { useNavigation } from "@react-navigation/native";
import useNewToast from "@/app/hooks/useNewToast";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { CloseCircleIcon } from "@/components/ui/icon";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function useLogin() {
  const [isPending, startTransition] = useTransition();
  const navigation = useNavigation<NavigationProps>();
  const { toast } = useNewToast();

  const onSubmit = async (data: LoginFormValues) => {
    startTransition(async () => {
      try {
        const result = await login(data);
        if (!result.ok) {
          toast({
            title: "Erro!",
            description: "Senha ou usuário inválidos.",
            variant: "error",
            icon: CloseCircleIcon,
          });
          return;
        }
        // toast({
        //   title: "Sucesso!",
        //   description: "Usuário logado com sucesso!",
        //   variant: "success",
        //   icon: CheckCircleIcon,
        // });
        navigation.navigate("Home");
      } catch (error) {
        console.error("Erro no servidor", error);
        toast({
          title: "Erro!",
          description: "Erro no servidor.",
          variant: "error",
          icon: CloseCircleIcon,
        });
      }
    });
  };

  return {
    onSubmit,
    isPending,
  };
}
