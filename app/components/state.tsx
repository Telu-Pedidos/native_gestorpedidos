import { ReactNode } from "react";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { ChevronDownIcon } from "lucide-react-native";

type StateProps = {
  children: ReactNode;
  active: boolean;
};

export function State({ children, active }: StateProps) {
  return (
    <Badge
      size="md"
      variant="solid"
      action={active ? "success" : "muted"}
      className={`rounded-md ${active ? "bg-[#3CAF47]" : "bg-destructive"}`}
    >
      <BadgeText className={"text-white"}>{children}</BadgeText>
      <BadgeIcon as={ChevronDownIcon} color="#fff" className="ml-2" />
    </Badge>
  );
}
