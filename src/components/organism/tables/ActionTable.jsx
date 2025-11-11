import styled from "styled-components";

export function ActionTable({ func, icon, color, fontSize }) {
  return (
    <Container onClick={func} color={color} fontSize={fontSize}>
      {icon}
    </Container>
  );
}
const Container = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
`;
