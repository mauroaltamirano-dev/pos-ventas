import styled from "styled-components";
export const Line = styled.div`
  background-color: ${({ theme }) => theme.color2};
  height: 2px;
  border-radius: 15px;
  margin: 20px 0;
  position: relative;
  text-align: center;

  span {
    top: -10px;
    position: absolute;
    background-color: ${({ theme }) => theme.bgTotal};
    text-align: center;
    padding: 0 5px;
    color: ${({ theme }) => theme.color2};
    font-weight: 700;
  }
`;
