import logo from "../assets/logo.png";
import logoWhite from "../assets/logo.png"; // Asegúrate de tener una versión blanca si el fondo es oscuro, si no usa la misma.

// Color de Marca Principal
const brandColor = "#5D3FD3";
const brandColorHover = "#4c32b3";
const secondaryTech = "#00D4FF"; // Un cian brillante para detalles tecnológicos pequeños

export const Light = {
  logo: logo,

  // --- Colores Principales ---
  primary: brandColor,
  body: "#F8FAFC", // Slate-50: Un gris muy claro, más moderno que el blanco puro
  text: "#1E293B", // Slate-800: Gris oscuro profesional
  textInput: "#334155",

  // --- Fondos y Capas (Backgrounds) ---
  bg: "#FFFFFF",
  bg2: "#F1F5F9", // Slate-100: Para secciones alternas
  bg3: "#FFFFFF", // Fondos de elementos puros
  bg4: "#E2E8F0", // Slate-200: Para elementos hover o inputs deshabilitados
  bg5: "#EEF2FF", // Un tinte muy suave violeta para fondos decorativos
  bg6: "rgba(93, 63, 211, 0.1)", // Violeta transparente para fondos de iconos
  bgTotal: "#F8FAFC", // Fondo general de la app
  bgCards: "#e1e1e1", // Tarjetas blancas limpias
  whiteBg: "#FFFFFF", // Fondo blanco puro explícito
  bgTgRight: "#E2E8F0", // Fondo del toggle switch
  bgAlpha: "rgba(255, 255, 255, 0.8)", // Fondos con blur

  // --- Textos y Títulos ---
  colorTitleCard: "#0F172A", // Slate-900
  colorSubtitleCard: "#64748B", // Slate-500
  colorSubtitle: "#475569",
  colorScroll: "#CBD5E1", // Color de la barra de scroll
  bodyRgba: "255, 255, 255", // Para efectos de transparencia
  textRgba: "30, 41, 59",

  // --- Elementos UI, Bordes y Activos ---
  border: "#E2E8F0", // Bordes sutiles
  bgActive: "rgba(93, 63, 211, 0.1)", // Fondo cuando un item está activo
  borderActive: brandColor, // Borde activo violeta
  textActive: brandColor, // Texto activo violeta

  // --- Componentes Específicos ---
  carouselColor: brandColor,
  colorToggle: brandColor,
  translateToggle: "-12px", // Mantenemos la lógica de posición
  logoRotate: "360deg",
  sliderOffSet: "0.3em",
  sizeOficon: "1.4em",
  rgbaBgAnimate: "rgba(93, 63, 211, 0.1)", // Animaciones con el color de marca

  // --- Colores Secundarios / Alertas ---
  color1: secondaryTech, // Azul cian para detalles tech
  color2: "#94A3B8", // Gris neutro para elementos secundarios
  delete: "#EF4444", // Rojo moderno para borrar

  // --- Fuentes (Se mantienen igual para no romper estructura) ---
  fontxs: "0.75em",
  fontsm: "0.875em",
  fontmd: "1em",
  font16px: "16px",
  fontlg: "1.25em",
  fontxl: "2em",
  fontxxl: "3em",
  fontxxxl: "4em",
  fontButton: "0.875em",
  navHeight: "5rem",
};

export const Dark = {
  logo: logoWhite,

  // --- Colores Principales ---
  primary: brandColor, // El violeta resalta muy bien sobre oscuro
  body: "#0F172A", // Slate-900: Fondo oscuro profundo (no negro puro)
  text: "#F1F5F9", // Slate-100: Texto casi blanco
  textInput: "#334155",

  // --- Fondos y Capas (Backgrounds) ---
  bg: "#0F172A", // Fondo principal
  bg2: "#1E293B", // Slate-800: Para tarjetas o sidebar
  bg3: "#1E293B",
  bg4: "#334155", // Slate-700: Hover en modo oscuro
  bg5: "#1E1B4B", // Indigo-950: Fondo oscuro con tinte violeta
  bg6: "rgba(93, 63, 211, 0.2)", // Violeta transparente más visible
  bgTotal: "#020617", // Slate-950: Fondo ultra oscuro para contraste
  bgCards: "#1E293B", // Tarjetas oscuras
  whiteBg: "#1E293B", // Reemplazo del blanco en modo oscuro
  bgTgRight: "#334155",
  bgAlpha: "rgba(15, 23, 42, 0.6)",

  // --- Textos y Títulos ---
  colorTitleCard: "#F8FAFC",
  colorSubtitleCard: "#94A3B8", // Slate-400
  colorSubtitle: "#94A3B8",
  colorScroll: "#475569",
  bodyRgba: "15, 23, 42",
  textRgba: "241, 245, 249",

  // --- Elementos UI, Bordes y Activos ---
  border: "#334155", // Bordes oscuros
  bgActive: "rgba(93, 63, 211, 0.25)", // Fondo activo con más opacidad
  borderActive: brandColor,
  textActive: "#A78BFA", // Violeta más claro (Light Violet) para leer mejor sobre oscuro

  // --- Componentes Específicos ---
  carouselColor: "#A78BFA", // Versión clara del violeta
  colorToggle: brandColor,
  translateToggle: "26px",
  logoRotate: "-360deg",
  sliderOffSet: "0.3em",
  sizeOficon: "1.4em",
  rgbaBgAnimate: "rgba(93, 63, 211, 0.2)",

  // --- Colores Secundarios / Alertas ---
  color1: secondaryTech,
  color2: "#475569",
  delete: "#F87171", // Rojo más claro para modo oscuro

  // --- Fuentes ---
  fontxs: "0.75em",
  fontsm: "0.875em",
  fontmd: "1em",
  font16px: "16px",
  fontlg: "1.25em",
  fontxl: "2em",
  fontxxl: "3em",
  fontxxxl: "4em",
  fontButton: "0.875em",
  navHeight: "5rem",
};
