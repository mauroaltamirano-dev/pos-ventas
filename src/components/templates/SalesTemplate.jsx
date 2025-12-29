/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Device } from "../../styles/breakpoints.jsx";
import { v } from "../../styles/variables.jsx";
import { blurIn } from "../../styles/keyframes.jsx";
import {
  HeaderSales,
  AreaDetailsSales,
  AreaKeyboardSales,
  FooterSales,
  AreaPayment,
  useSalesCartStore,
} from "../../index.js";
import { Toaster } from "sonner";

export function SalesTemplate() {
  const { statePayment } = useSalesCartStore();

  return (
    <Container>
      <Toaster richColors position="top-center" />
      {statePayment && <AreaPayment />}
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
  min-height: calc(100vh - 70px);
  padding: 10px;
  padding-top: 50px;
  display: grid;
  gap: 10px;
  grid-template-areas:
    "header"
    "main";
  grid-template-rows: auto 1fr;
  background-color: ${({ theme }) => theme.bgTotal};
  overflow: hidden;

  @media ${Device.desktop} {
    padding: 20px;
    gap: 20px;
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-rows: auto 1fr auto;
    padding-top: 50px;
  }

  animation: ${blurIn} 0.5s ease-in-out;
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
