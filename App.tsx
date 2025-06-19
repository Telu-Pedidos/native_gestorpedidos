import "@/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// components
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { BottomTab } from "@/app/components/bottom-tab";

// pages
import WelcomeScreen from "@/app/pages/welcome";
import LoginScreen from "@/app/pages/login";
import HomeScreen from "@/app/pages/home";
import AuthLoadingScreen from "@/app/pages/auth-loading-screen";
import ClientsScreen from "@/app/pages/client/home";
import ClientEditScreen from "@/app/pages/client/edit";
import NotFound from "@/app/pages/not-found";
import ClientRegisterScreen from "@/app/pages/client/register";
import ModelsScreen from "@/app/pages/model/home";
import ModelRegisterScreen from "@/app/pages/model/register";
import ModelEditScreen from "./app/pages/model/edit";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
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
                options={{ title: "Editar cliente", headerShown: true }}
              />
              <Stack.Screen
                name="ClientRegister"
                component={ClientRegisterScreen}
                options={{ title: "Cadastrar cliente", headerShown: true }}
              />
              <Stack.Screen
                name="Models"
                component={ModelsScreen}
                options={{ title: "Modelos", headerShown: false }}
              />
              <Stack.Screen
                name="ModelEdit"
                component={ModelEditScreen}
                options={{ title: "Editar modelo", headerShown: true }}
              />
              <Stack.Screen
                name="ModelRegister"
                component={ModelRegisterScreen}
                options={{ title: "Cadastrar modelo", headerShown: true }}
              />
            </Stack.Navigator>
            <StatusBar style="auto" />
            <BottomTab />
          </View>
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
