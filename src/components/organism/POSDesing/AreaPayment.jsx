import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSalesCartStore } from "../../../store/SalesCartStore";
import { CollectPayment } from "./CollectPayment";
import { ShowTicketSales } from "./ShowTicketSales";

export function AreaPayment() {
  const [stateShowTicket, setStateShowTicket] = useState(false);
  const { setStatePayment } = useSalesCartStore();
  const collectPaymentRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (collectPaymentRef.current) {
          collectPaymentRef.current.mutateAsync();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <section className="contentInsertPayment">
        {stateShowTicket && (
          <ShowTicketSales
            setState={() => setStateShowTicket(!stateShowTicket)}
          />
        )}
        <article
          className="contentShowTicket"
          onClick={() => setStateShowTicket(true)}
          title="Ver Ticket"
        >
          <span>Ver Ticket</span>
          <Icon
            className="iconTicket"
            icon="ion:receipt"
            width="24"
            height="24"
          />
        </article>
        <CollectPayment ref={collectPaymentRef} />
        <article className="contentShowTicket" onClick={setStatePayment}>
          <Icon icon="ion:exit" width="24" height="24" />
          <span>Volver</span>
        </article>
      </section>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 99;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgTotal};

  .contentInsertPayment {
    display: flex;
    flex-direction: column;
    /* width: 50%; */
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    position: relative;

    .contentShowTicket {
      align-self: flex-end;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 8px;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.bg3};
      }

      span {
        font-weight: 600;
        font-size: 14px;
      }

      .iconTicket {
        font-size: 20px;
      }
    }
  }
`;
