import styled from "styled-components";
import { v } from "../../styles/variables";
import { Title } from "../atom/Title";
import { useLocation } from "react-router-dom";

export function UsersTemplate() {
  const location = useLocation();

  return (
    <Container>
      <Title>
        {location.pathname === "/configs/users"
          ? "Control de Personal"
          : "Categorías"}
      </Title>
      <Content>
        <p>Aquí podrás administrar los usuarios del sistema.</p>
        {/* Future implementation: User table, add user button, etc. */}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: ${v.lgSpacing};
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bgTotal};
`;

const Content = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: ${v.lgSpacing};
  border-radius: ${v.borderRadius};
  box-shadow: ${v.boxShadowGray};
`;
