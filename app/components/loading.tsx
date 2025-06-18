import { Animated, Easing, View } from "react-native";
import { useEffect, useRef } from "react";
import { LoaderCircleIcon } from "lucide-react-native";

export default function LoadingComponent() {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex min-h-screen items-center justify-center">
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LoaderCircleIcon size={64} color="#ffc60a" />
      </Animated.View>
    </View>
  );
}
