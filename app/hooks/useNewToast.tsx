import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { CloseIcon, HelpCircleIcon, Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { HStack } from "@/components/ui/hstack";
import { cn } from "@/app/lib/utils";
import { ToastPlacement } from "@gluestack-ui/toast/lib/types";
import { IIconComponentType } from "@gluestack-ui/icon/lib/createIcon";
import { SvgProps } from "react-native-svg";
import { ColorValue } from "react-native";

interface Toast {
  title: string;
  description: string;
  placement?: ToastPlacement;
  variant?: "default" | "error" | "success";
  duration?: number;
  icon?: IIconComponentType<
    | SvgProps
    | {
        fill?: ColorValue;
        stroke?: ColorValue;
      }
  >;
}

export default function useNewToast() {
  const toastContainer = useToast();

  const toast = ({
    title,
    description,
    variant = "default",
    placement = "top",
    duration = 3000,
    icon = HelpCircleIcon,
  }: Toast) => {
    const newId = String(Math.random());
    toastContainer.show({
      id: newId,
      placement,
      duration: duration,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            action={variant === "default" ? "muted" : variant}
            variant="outline"
            nativeID={uniqueToastId}
            className={cn(
              "shadow-hard-5 relative top-10 z-50 w-full max-w-[443px] flex-row justify-between gap-6 bg-background p-4",
              variant === "default" && "border-border",
              variant === "error" && "border-destructive",
              variant === "success" && "border-green-800",
            )}
          >
            <HStack space="md">
              {icon && (
                <Icon
                  as={icon}
                  className={cn(
                    "mt-0.5",
                    variant === "default" && "stroke-border",
                    variant === "error" && "stroke-destructive",
                    variant === "success" && "stroke-green-800",
                  )}
                />
              )}

              <VStack space="xs">
                <ToastTitle
                  className={cn(
                    "font-semibold",
                    variant === "default" && "text-foreground",
                    variant === "error" && "text-destructive",
                    variant === "success" && "text-green-800",
                  )}
                >
                  {title}
                </ToastTitle>
                <ToastDescription
                  size="sm"
                  className={cn(
                    variant === "default" && "text-foreground",
                    variant === "error" && "text-destructive",
                    variant === "success" && "text-green-800",
                  )}
                >
                  {description}
                </ToastDescription>
              </VStack>
            </HStack>
            <HStack className="gap-1 min-[450px]:gap-3">
              <Pressable onPress={() => toastContainer.close(id)}>
                <Icon
                  as={CloseIcon}
                  className={cn(
                    variant === "default" && "text-foreground",
                    variant === "error" && "text-destructive",
                    variant === "success" && "text-green-800",
                  )}
                />
              </Pressable>
            </HStack>
          </Toast>
        );
      },
    });
  };

  return {
    toast,
  };
}
