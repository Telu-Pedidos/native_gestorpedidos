import React, { useState, useTransition } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useNewToast from "@/app/hooks/useNewToast";
import activateProduct from "@/app/actions/product/activate-product";
import deactivateProduct from "@/app/actions/product/deactivate-product";
import { State } from "@/app/components/state";

type ProductStateProps = {
  active: boolean;
  id: string;
};

export default function ProductState({ id, active }: ProductStateProps) {
  const { toast } = useNewToast();

  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(active);
  const [modalVisible, setModalVisible] = useState(false);

  const handleActivate = () => {
    setModalVisible(false);
    startTransition(async () => {
      try {
        const result = await activateProduct(id);
        if (result.ok) {
          setIsActive(true);
        } else {
          toast({
            title: result.error || "Erro ao ativar",
            variant: "error",
          });
        }
      } catch (error) {
        toast({
          title: "Erro ao ativar o produto.",
          variant: "error",
        });
        console.error(error);
      }
    });
  };

  const handleDeactivate = () => {
    setModalVisible(false);
    startTransition(async () => {
      try {
        const result = await deactivateProduct(id);
        if (result.ok) {
          setIsActive(false);
        } else {
          toast({
            title: result.error || "Erro ao desativar",
            variant: "error",
          });
        }
      } catch (error) {
        toast({
          title: "Erro ao desativar o produto.",
          variant: "error",
        });
        console.error(error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isActive ? handleDeactivate : handleActivate}
        style={styles.stateButton}
      >
        <State active={isActive}>{isActive ? "Disponível" : "Esgotado"}</State>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  stateButton: { padding: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    minWidth: 200,
  },
  optionButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
});
