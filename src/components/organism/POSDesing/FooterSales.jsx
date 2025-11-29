import styled from "styled-components";
import { Device } from "../../../styles/breakpoints";
import { Btn1 } from "../../molecules/Btn1";
import { Icon } from "@iconify/react";

export function FooterSales() {
  return (
    <Footer>
      <article className="content">
        <Btn1
          title="Eliminar Venta"
          color="#ff4d4d"
          border="2px"
          icon={<Icon icon="material-symbols:delete-outline" width="20" />}
        />
        <Btn1
          title="Ver Ventas del día"
          bgColor="#33b81c"
          color="#fff"
          icon={
            <Icon icon="material-symbols:receipt-long-outline" width="20" />
          }
        />
      </article>
    </Footer>
  );
}
const Footer = styled.section`
  grid-area: footer;
  display: none;
  background: ${({ theme }) => theme.bg || "#fff"};
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.05);
  align-items: center;

  @media ${Device.desktop} {
    display: flex;
    justify-content: flex-end;
  }

  .content {
    display: flex;
    gap: 15px;
  }
`;
