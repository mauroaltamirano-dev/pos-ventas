import styled from "styled-components";
import { Device } from "../../../styles/breakpoints";
import { Btn1 } from "../../molecules/Btn1";
import { Icon } from "@iconify/react";
import { useSalesCartStore } from "../../../store/SalesCartStore";

export function FooterSales() {
  const { resetState } = useSalesCartStore();

  return (
    <Footer>
      <article className="content">
        <Btn1
          title="Eliminar Venta"
          border="2px"
          icon={<Icon icon="material-symbols:delete-outline" width="20" />}
          func={resetState}
          bgColor={`#ff4d4d`}
          color={`#fff`}
        />
      </article>
    </Footer>
  );
}
const Footer = styled.section`
  grid-area: footer;
  display: none;
  background: ${({ theme }) => theme.bg};
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
