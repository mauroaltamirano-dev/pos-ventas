import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSalesCartStore, Btn1 } from "../../../index.js";
import TicketSale from "../../../reports/TicketSale.jsx";
import { Icon } from "@iconify/react";

export function ShowTicketSales({ setState }) {
  const [base64, setBase64] = useState("");
  const { items } = useSalesCartStore();

  const onGenerateTicket = async (output) => {
    const dataCompany = {
      logoCompany: "https://i.ibb.co/qYpcbByV/logo.png",
      products: items,
    };
    const response = await TicketSale(output, dataCompany);
    if (output === "b64") {
      setBase64(response?.content ?? "");
    }
  };

  useEffect(() => {
    onGenerateTicket("b64");
  }, [items]);

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <h3>Vista Previa del Ticket</h3>
          <CloseButton onClick={setState}>
            <Icon icon="ion:close" width="24" height="24" />
          </CloseButton>
        </Header>

        <PreviewArea>
          <iframe
            src={`data:application/pdf;base64,${base64}`}
            title="Ticket Preview"
          />
        </PreviewArea>

        <Footer>
          <Btn1
            func={() => onGenerateTicket("print")}
            title="Imprimir"
            icon="ion:print"
            width="auto"
            bgColor="#10b981"
            color="#fff"
          />
          <Btn1
            func={() => onGenerateTicket("b64")}
            title="Regenerar"
            icon="ion:refresh"
            width="auto"
            bgColor="#3b82f6"
            color="#fff"
          />
        </Footer>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px; /* Ancho típico de un ticket o vista previa */
  height: 90%;
  background-color: ${({ theme }) => theme.bgTotal};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
`;

const PreviewArea = styled.div`
  flex: 1;
  background-color: #525659; /* Color de fondo común para visores PDF */
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

const Footer = styled.div`
  padding: 15px;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.bg};
  border-top: 1px solid ${({ theme }) => theme.border};
`;
