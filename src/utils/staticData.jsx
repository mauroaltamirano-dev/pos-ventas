// eslint-disable-next-line no-unused-vars
import { v } from "../styles/variables";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";

export const LinksArray = [
  {
    label: "Home",
    icon: "noto-v1:house",
    to: "/",
  },
  {
    label: "Vender",
    icon: "flat-color-icons:shop",
    to: "/pos",
  },
  {
    label: "Kardex",
    icon: "flat-ui:box",
    to: "/kardex",
  },
  {
    label: "Reportes",
    icon: "flat-ui:graph",
    to: "/reports",
  },
];

export const SecondaryLinksArray = [
  {
    label: "Configuración",
    icon: "icon-park:setting-two",
    to: "/configs",
    color: "#CE82FF",
  },
];

export const userDeployed = [
  {
    text: "Mi Perfil",
    icon: <v.userIcon />,
    type: "my-perfil",
  },
  {
    text: "Configuración",
    icon: <v.settingsIcon />,
    type: "configuration",
  },
  {
    text: "Cerrar Sesión",
    icon: <v.logoutIcon />,
    type: "logout",
  },
];

// export const LinksArray = [
//   {
//     label: "Home",
//     icon: "noto-v1:house",
//     to: "/",
//   },
//   {
//     label: "Vender",
//     icon: "flat-color-icons:shop",
//     to: "/pos",
//   },
//   {
//     label: "Kardex",
//     icon: "flat-ui:box",
//     to: "/kardex",
//   },
//   {
//     label: "Reportes",
//     icon: "flat-ui:graph",
//     to: "/reports",
//   },
// ];

// export const SecondaryLinksArray = [
//   {
//     label: "Configuración",
//     icon: "icon-park:setting-two",
//     to: "/config",
//     color: "#CE82FF",
//   },
// ];

export const dataTheme = [
  {
    icon: "☀️",
    description: "light",
  },
  {
    icon: "🌚",
    description: "dark",
  },
];

export const configurationModulesData = [
  {
    title: "Productos",
    subtitle: "Registra tus productos",
    icon: "https://i.ibb.co/85zJ6yG/caja-del-producto.png",
    link: "/configs/products",
  },
  {
    title: "Personal",
    subtitle: "Control de personal",
    icon: "https://i.ibb.co/5vgZ0fX/hombre.png",
    link: "/configs/users",
  },
  {
    title: "Tu Empresa",
    subtitle: "Configurar opciones básicas",
    icon: "https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link: "/configs/company",
  },
  {
    title: "Marca de productos",
    subtitle: "Gestiona tus marcas",
    icon: "https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link: "/configs/brand",
  },
  {
    title: "Categoría de productos",
    subtitle: "Asigna categorías a tus productos",
    icon: "https://i.ibb.co/VYbMRLZ/categoria.png",
    link: "/configs/categories",
  },
  {
    title: "Marca de productos",
    subtitle: "Gestiona tus marcas",
    icon: "https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link: "/configs/brand",
  },
];

export const dataUserType = [
  {
    description: "Empleado",
    icon: "🌲",
  },
  {
    description: "Administrador",
    icon: "👑",
  },
];

export const dataDocType = [
  {
    description: "D.N.I",
    icon: "💳",
  },
  {
    description: "Pasaporte",
    icon: "🧾",
  },
  {
    description: "Otros",
    icon: "🗄️",
  },
];
