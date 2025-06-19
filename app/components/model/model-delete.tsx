import deleteModel from "@/app/actions/model/delete-model";
import useNewToast from "@/app/hooks/useNewToast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TrashIcon, TriangleAlertIcon } from "lucide-react-native";
import { useState, useTransition } from "react";
import { View } from "react-native";

type ModelDeleteProps = {
  id: number;
  name: string;
  fetchData: () => Promise<void>;
};

export function ModelDelete({ id, name, fetchData }: ModelDeleteProps) {
  const [isPending, startTransition] = useTransition();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { toast } = useNewToast();
  const handleClose = () => setShowAlertDialog(false);

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteModel(String(id));
        fetchData();
      } catch (error) {
        console.error(error);
        toast({
          title: "ocorreu um erro ao tentar excluir o modelo",
          variant: "error",
        });
      }
    });
  }

  return (
    <>
      <Button
        onPress={() => setShowAlertDialog(true)}
        className="flex flex-row items-center gap-2 rounded-md bg-destructive px-2 py-1"
      >
        <TrashIcon size={14} className="text-destructive-foreground" />
        <ButtonText className="text-destructive-foreground">Excluir</ButtonText>
      </Button>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={handleClose}
        size="full"
        className="bg-black/60 p-1"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent className="flex flex-col gap-4 rounded-md bg-white">
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="lg">
              Tem certeza que deseja remover o modelo "{name}"?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mb-4 mt-3">
            <View className="mb-4 flex flex-row gap-2 text-destructive">
              <TriangleAlertIcon size={16} color={"red"} />
              <Text className="flex flex-col gap-1 text-base font-medium text-destructive">
                Atenção! Você está prestes a excluir o modelo{" "}
                <Text className="font-bold">{name}</Text>.
              </Text>
            </View>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              disabled={isPending}
              action="secondary"
              onPress={handleClose}
              size="sm"
              className="bg-secondary"
            >
              <ButtonText className="text-foreground">Cancelar</ButtonText>
            </Button>
            <Button
              disabled={isPending}
              size="sm"
              onPress={handleDelete}
              className="bg-destructive"
            >
              <ButtonText className="text-destructive-foreground">
                Excluir
              </ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
