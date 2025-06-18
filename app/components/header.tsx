import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MenuIcon } from "lucide-react-native";
import { Image } from "@/components/ui/image";
import useNewToast from "../hooks/useNewToast";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import {
  ClockIcon,
  DownloadIcon,
  EditIcon,
  EyeOffIcon,
  TrashIcon,
} from "@/components/ui/icon";

export function Header() {
  const navigation = useNavigation();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useNewToast();

  // const handleLogout = async () => {
  //   setIsPending(true);
  //   try {
  //     await logout();
  //     toast.success("Usuário deslogado com sucesso!");
  //   } catch (err) {
  //     toast.error("Erro ao deslogar.");
  //   } finally {
  //     setIsPending(false);
  //     setIsOpen(false);
  //   }
  // };

  const menuLinks = [
    { id: "home", name: "Início", href: "Dashboard" },
    { id: "pedidos", name: "Pedidos", href: "Orders" },
    // adicione mais rotas conforme necessário
  ];

  return (
    <VStack className="border border-border bg-background p-4">
      <HStack className="items-center justify-between">
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <HStack className="items-center" space="md">
            <Image
              size="sm"
              source={{
                uri: "https://ik.imagekit.io/hijykdr24/telupedidos/logo.png?updatedAt=1746369517720",
              }}
              alt="Logo Télu"
            />
            <Text className="text-base font-semibold text-primary-foreground">
              Télu Pedidos
            </Text>
          </HStack>
        </Pressable>

        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Icon as={MenuIcon} size="lg" />
        </TouchableOpacity>
      </HStack>

      {/* <Button onPress={() => setShowActionsheet(true)}>
        <ButtonText>Open</ButtonText>
      </Button> */}
      {/* 
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon className="stroke-background-700" as={EditIcon} />
            <ActionsheetItemText>Edit Message</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon
              className="stroke-background-700"
              as={EyeOffIcon}
            />
            <ActionsheetItemText>Mark Unread</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon className="stroke-background-700" as={ClockIcon} />
            <ActionsheetItemText>Remind Me</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon
              className="stroke-background-700"
              as={DownloadIcon}
            />
            <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem isDisabled onPress={handleClose}>
            <ActionsheetIcon className="stroke-background-700" as={TrashIcon} />
            <ActionsheetItemText>Delete</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet> */}
    </VStack>
  );
}
