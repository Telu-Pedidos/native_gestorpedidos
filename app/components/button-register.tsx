import { TouchableOpacity } from "react-native";
import { PlusIcon } from "lucide-react-native";

interface ButtonRegisterProps {
  handleAction: () => void;
}

export function ButtonRegister({ handleAction }: ButtonRegisterProps) {
  return (
    <TouchableOpacity
      onPress={handleAction}
      className="absolute bottom-40 right-6 z-50 h-16 w-16 items-center justify-center rounded-full border border-[#e8c468] bg-primary shadow-lg"
    >
      <PlusIcon size={28} color="#fff" />
    </TouchableOpacity>
  );
}
