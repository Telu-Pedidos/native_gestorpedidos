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
import LoginScreen from "@/app/pages/login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/app/pages/home";
import AuthLoadingScreen from "@/app/pages/auth-loading-screen";
import ClientsScreen from "@/app/pages/clients/home";
import ClientEditScreen from "@/app/pages/clients/edit";
import NotFound from "@/app/pages/not-found";
import ClientRegisterScreen from "./app/pages/clients/register";

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
        <View className="flex-1 bg-background pb-12 pt-6 text-foreground">
          <Stack.Navigator>
            <Stack.Screen
              name="AuthLoading"
              component={AuthLoadingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotFound"
              component={NotFound}
              options={{ title: "Página não encontrada", headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ title: "Welcome", headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home", headerShown: false }}
            />
            <Stack.Screen
              name="Clients"
              component={ClientsScreen}
              options={{ title: "Clientes", headerShown: false }}
            />
            <Stack.Screen
              name="ClientEdit"
              component={ClientEditScreen}
              options={{ title: "Editar cliente", headerShown: false }}
            />
            <Stack.Screen
              name="ClientRegister"
              component={ClientRegisterScreen}
              options={{ title: "Cadastrar cliente", headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
