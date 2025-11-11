import styled from "styled-components";
import { PacmanLoader } from "react-spinners";

export function Spinner1() {
  return (
    <Container>
      <PacmanLoader color="#d78c36" size={40} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
