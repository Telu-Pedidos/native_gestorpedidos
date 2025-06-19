import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/models/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabLinks } from "@/app/utils/links";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function BottomTab() {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="w-full border-t border-border bg-white px-4 py-2"
      style={{
        paddingBottom: insets.bottom || 8,
        position: "absolute",
        bottom: 0,
      }}
    >
      <HStack className="justify-between">
        {tabLinks.map(({ name, icon: IconComponent, route }) => (
          <TouchableOpacity
            key={route}
            onPress={() => navigation.navigate(route as any)}
            className="flex-1 items-center"
          >
            <IconComponent size={22} color="#4B5563" />
            <Text className="mt-1 text-xs text-muted-foreground">{name}</Text>
          </TouchableOpacity>
        ))}
      </HStack>
    </View>
  );
}
