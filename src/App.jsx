import { ThemeProvider } from "styled-components";
import {
  GlobalStyles,
  useThemeStore,
  AuthContextProvider,
  MyRoutes,
} from "./index.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const { themeStyle } = useThemeStore();

  return (
    <ThemeProvider theme={themeStyle}>
      <AuthContextProvider>
        <GlobalStyles />
        <MyRoutes />
        <ReactQueryDevtools initialIsOpen={true} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
