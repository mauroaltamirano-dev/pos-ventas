import styled from "styled-components";
import { useAuthStore } from "../../store/AuthStore";
import { UserAuth } from "../../context/AuthContext";

export function HomeTemplate() {
  const { logoutSession } = useAuthStore();
  const { user } = UserAuth();

  return (
    <Container>
      <span>HomeTemplate</span>
      <button onClick={logoutSession}>Cerrar Sesión</button>
      <span>{user.email}</span>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
