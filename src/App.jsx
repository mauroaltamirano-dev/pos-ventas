import styled, { ThemeProvider } from "styled-components";
import {
  GlobalStyles,
  MyRoutes,
  Sidebar,
  useThemeStore,
  AuthContextProvider,
  Login,
} from "./index.js";
import { Device } from "./styles/breakpoints";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { themeStyle } = useThemeStore();
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={themeStyle}>
      <AuthContextProvider>
        <GlobalStyles />
        {pathname != "/login" ? (
          <Container>
            <section className="contentSidebar">
              <Sidebar
                state={sidebarOpen}
                setState={() => setSidebarOpen(!sidebarOpen)}
              />
            </section>
            <section className="contentMenuMobile">Menu Mobile</section>
            <section className="contentRouters">
              <MyRoutes />
            </section>
          </Container>
        ) : (
          <Login />
        )}
        <ReactQueryDevtools initialIsOpen={true} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${({ theme }) => theme.text};

  .contentSidebar {
    display: none;
    /* background-color: rgba(22, 180, 66, 0.5); */
  }

  .contentMenuMobile {
    position: absolute;
    /* background-color: rgba(255, 5, 255, 0.5); */
  }

  .contentRouters {
    /* background-color: rgba(231, 239, 0, 0.5); */
    grid-column: 1;
    width: 100%;
  }

  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;

    &.active {
      grid-template-columns: 260px 1fr;
    }

    .contentSidebar {
      display: initial;
    }

    .contentMenuMobile {
      display: none;
    }

    .contentRouters {
      grid-column: 2;
    }
  }
`;

export default App;
