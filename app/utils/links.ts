import { RootStackParamList } from "@/app/models/navigation";
import {
  HomeIcon,
  UsersIcon,
  BoxesIcon,
  MenuIcon,
  PackageSearchIcon,
  HouseIcon,
  StickyNoteIcon,
  ComponentIcon,
  CircleUserIcon,
} from "lucide-react-native";

interface TabLink {
  name: string;
  icon: React.ElementType;
  route: keyof RootStackParamList;
}

export const tabLinks: TabLink[] = [
  { name: "Início", icon: HouseIcon, route: "Home" },
  { name: "Produtos", icon: PackageSearchIcon, route: "Products" },
  { name: "Clientes", icon: CircleUserIcon, route: "Clients" },
  { name: "Modelos", icon: ComponentIcon, route: "Models" },
  { name: "Mais", icon: MenuIcon, route: "Menu" },
];

export const allLinks: TabLink[] = [
  { name: "Início", icon: HouseIcon, route: "Home" },
  { name: "Produtos", icon: PackageSearchIcon, route: "Products" },
  { name: "Clientes", icon: CircleUserIcon, route: "Clients" },
  { name: "Modelos", icon: ComponentIcon, route: "Models" },
  { name: "Categorias", icon: StickyNoteIcon, route: "Categories" },
];
