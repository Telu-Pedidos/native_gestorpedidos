import { RootStackParamList } from "@/app/models/navigation";
import {
  HomeIcon,
  UsersIcon,
  BoxesIcon,
  MenuIcon,
  PackageSearchIcon,
} from "lucide-react-native";

interface TabLink {
  name: string;
  icon: React.ElementType;
  route: keyof RootStackParamList;
}

export const tabLinks: TabLink[] = [
  { name: "Início", icon: HomeIcon, route: "Home" },
  { name: "Produtos", icon: PackageSearchIcon, route: "Products" },
  { name: "Clientes", icon: UsersIcon, route: "Clients" },
  { name: "Categorias", icon: BoxesIcon, route: "Categories" },
  { name: "Mais", icon: MenuIcon, route: "Menu" },
];
