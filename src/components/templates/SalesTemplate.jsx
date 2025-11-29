/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Device } from "../../styles/breakpoints.jsx";
import { v } from "../../styles/variables.jsx";
import {
  HeaderSales,
  AreaDetailsSales,
  AreaKeyboardSales,
  FooterSales,
} from "../../index.js";

export function SalesTemplate() {
  return (
    <Container>
      <HeaderSales />
      <Main>
        <ItemSales>
          <AreaDetailsSales />
          <AreaKeyboardSales />
        </ItemSales>
      </Main>
      <FooterSales />
    </Container>
  );
}

const Container = styled.div`
  min-height: calc(100vh - 50px);
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-areas:
    "header"
    "main";
  grid-template-rows: auto 1fr;
  background-color: ${({ theme }) => theme.bgTotal};
  overflow: hidden;
  margin-top: 40px;

  @media ${Device.desktop} {
    padding: 20px;
    gap: 20px;
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-rows: auto 1fr auto;
    margin-top: 0;
  }
`;

const ItemSales = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;

  @media ${Device.desktop} {
    flex-direction: row;
    gap: 20px;
  }
`;

const Main = styled.div`
  grid-area: main;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
