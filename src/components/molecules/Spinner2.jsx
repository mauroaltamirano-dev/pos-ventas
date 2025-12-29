import styled from "styled-components";

export function Spinner2({ text }) {
  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
