import "@/global.css";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// components
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

// pages
import WelcomeScreen from "@/app/pages/welcome";
import LoginScreen from "./app/pages/login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/app/pages/home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <View className="flex-1 bg-background">
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={LoginScreen}
              options={{ title: "Welcome", headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home", headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
