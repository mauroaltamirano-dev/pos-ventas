import styled from "styled-components";
import {
  Sidebar,
  Spinner1,
  SwitchMenuMobile,
  useCompanyStore,
  useUserStore,
  MenuMobile,
  useBranchesStore,
} from "../index.js";
import { Device } from "../styles/breakpoints.jsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stateMenu, setStateMenu] = useState(false);

  const { users, showUsers } = useUserStore();
  const { showCompany } = useCompanyStore();
  const { showBranchAssigns } = useBranchesStore();

  const {
    isLoading,
    error,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["Show Users"],
    queryFn: showUsers,
    refetchOnWindowFocus: false,
    retryDelay: 1000,
  });

  useQuery({
    queryKey: ["Show Branch Assigns", users?.id],
    queryFn: () => showBranchAssigns({ id_user: users?.id }),
    enabled: !!users,
    refetchOnWindowFocus: false,
  });

  useQuery({
    queryKey: ["Show Company", users?.id],
    queryFn: () => showCompany({ _id_user: users?.id }),
    enabled: !!users,
    refetchOnWindowFocus: false,
  });

  if (users === null) refetchUsers();

  if (isLoading) return <Spinner1 />;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <section className="contentSidebar">
        <Sidebar
          state={sidebarOpen}
          setState={() => setSidebarOpen(!sidebarOpen)}
        />
      </section>
      <section className="contentMenuMobile">
        <SwitchMenuMobile
          state={stateMenu}
          setstate={() => setStateMenu(!stateMenu)}
        />
        {stateMenu && (
          <MenuMobile
            isOpen={stateMenu}
            setState={() => setStateMenu(!stateMenu)}
          />
        )}
      </section>
      <ContainerBody>{children}</ContainerBody>
    </Container>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${({ theme }) => theme.text};

  .contentSidebar {
    display: none;
  }

  .contentMenuMobile {
    position: absolute;
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
  }
`;

const ContainerBody = styled.section`
  grid-column: 1;
  width: 100%;

  @media ${Device.tablet} {
    grid-column: 2;
  }
`;
