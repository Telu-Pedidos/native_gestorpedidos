import { Status } from "@/app/validations/order-validation";
import {
  AlarmClock,
  CircleCheckIcon,
  CircleMinusIcon,
  ThumbsUpIcon,
} from "lucide-react-native";

export type OrderUtilsProps = {
  status: Status;
  activeStatus: Status | null;
  setActiveStatus: (status: Status) => void;
};

export const renderStatusIcon = ({
  status,
  iconColor,
}: {
  status: Status;
  iconColor: string;
}) => {
  switch (status) {
    case "PENDING":
      return <CircleMinusIcon color={iconColor} size={16} />;
    case "ACCEPTED":
      return <ThumbsUpIcon color={iconColor} size={16} />;
    case "PREPARATION":
      return <AlarmClock color={iconColor} size={16} />;
    case "COMPLETED":
      return <CircleCheckIcon color={iconColor} size={16} />;
  }
};

export const renderStatusText = (status: Status) => {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "ACCEPTED":
      return "Aceito";
    case "PREPARATION":
      return "Preparo";
    case "COMPLETED":
      return "Concluído";
  }
};

const createStatusStyles = (suffix: string = "") => ({
  PENDING: {
    border: `border-pending`,
    background: `bg-pending${suffix}`,
    iconBg: "bg-pending",
    text: "text-active",
  },
  ACCEPTED: {
    border: `border-accepted`,
    background: `bg-accepted${suffix}`,
    iconBg: "bg-accepted",
    text: "text-white",
  },
  PREPARATION: {
    border: `border-preparation`,
    background: `bg-preparation${suffix}`,
    iconBg: "bg-preparation",
    text: "text-white",
  },
  COMPLETED: {
    border: `border-completed`,
    background: `bg-completed${suffix}`,
    iconBg: "bg-completed",
    text: "text-[#303C34]",
  },
});

export const statusStylesRN = {
  PENDING: {
    border: { borderColor: "#FFD166" }, // amarelo
    background: { backgroundColor: "#FFF7E0" },
    iconBg: { backgroundColor: "#FFD166" },
    text: { color: "#92400E" },
  },
  ACCEPTED: {
    border: { borderColor: "#6E06D6" }, // roxo
    background: { backgroundColor: "#F3E8FF" },
    iconBg: { backgroundColor: "#6E06D6" },
    text: { color: "#4B0082" },
  },
  PREPARATION: {
    border: { borderColor: "#FF8266" }, // laranja
    background: { backgroundColor: "#FFECE6" },
    iconBg: { backgroundColor: "#FF8266" },
    text: { color: "#A83224" },
  },
  COMPLETED: {
    border: { borderColor: "#06D6A0" }, // verde-água
    background: { backgroundColor: "#D1FAF0" },
    iconBg: { backgroundColor: "#06D6A0" },
    text: { color: "#065F46" },
  },
};

export const statusStyles = createStatusStyles("/20");
export const statusStylesCard = createStatusStyles();
