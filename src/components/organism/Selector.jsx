import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
export function Selector({ color, state, func, text1, text2 }) {
  return (
    <Container color={color} onClick={func}>
      <div>
        <span>{text1}</span>
        <span>{text2}</span>
      </div>
      <span className={state ? "open" : "close"}>{<IoIosArrowDown />}</span>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${(props) => props.color};
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  transition: 0.3s;
  font-weight: 600;

  box-shadow: 4px 9px 20px -12px ${(props) => props.color};
  .open {
    transition: 0.3s;
    transform: rotate(0deg);
  }
  .close {
    transition: 0.3s;
    transform: rotate(180deg);
  }
`;
