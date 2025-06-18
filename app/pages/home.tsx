import { VStack } from "@/components/ui/vstack";
import ClientsScreen from "./clients/home";
import { Header } from "../components/header";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <VStack className="flex-1 items-center justify-center">
        <ClientsScreen />
      </VStack>
    </>
  );
}
