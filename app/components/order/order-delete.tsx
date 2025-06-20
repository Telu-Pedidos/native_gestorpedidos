import deleteOrder from "@/app/actions/order/delete-order";
import useNewToast from "@/app/hooks/useNewToast";
import { formatNumberToHex } from "@/app/utils/functions";
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
import { TrashIcon } from "lucide-react-native";
import { useState, useTransition } from "react";

type OrderDeleteProps = {
  id: number;
  fetchOrders: () => Promise<void>;
};

export function OrderDelete({ id, fetchOrders }: OrderDeleteProps) {
  const [isPending, startTransition] = useTransition();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { toast } = useNewToast();
  const handleClose = () => setShowAlertDialog(false);

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteOrder(String(id));
        fetchOrders();
      } catch (error) {
        console.error(error);
        toast({
          title: "ocorreu um erro ao tentar excluir o pedido",
          variant: "error",
        });
      }
    });
  }

  return (
    <>
      <Button
        onPress={() => setShowAlertDialog(true)}
        className="bg-destructive"
      >
        <TrashIcon size={14} className="text-destructive-foreground" />
        <ButtonText className="text-sm text-destructive-foreground">
          Excluir
        </ButtonText>
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
            <Heading className="text-typography-950 font-semibold" size="md">
              Tem certeza que deseja remover o pedido {formatNumberToHex(id)}?
            </Heading>
          </AlertDialogHeader>
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
