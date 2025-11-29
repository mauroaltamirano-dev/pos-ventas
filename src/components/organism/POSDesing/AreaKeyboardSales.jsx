import styled from "styled-components";
import { Btn1 } from "../../molecules/Btn1";
import { TotalSales } from "../../../index.js";
import { Device } from "../../../styles/breakpoints.jsx";

export function AreaKeyboardSales() {
  return (
    <AreaKeyboard>
      <section className="areaTypePayment">
        <article className="box">
          <Btn1
            title={"EFECTIVO"}
            border={"0"}
            height={"70px"}
            width={"100%"}
            bgColor={"#62b324"}
            color={"#fff"}
          />
          <Btn1
            title={"DÉBITO"}
            border={"0"}
            width={"100%"}
            bgColor={"#d96868"}
            color={"#fff"}
          />
        </article>
        <article className="box">
          <Btn1
            title={"CRÉDITO"}
            border={"0"}
            height={"70px"}
            width={"100%"}
            bgColor={"#ff97ee"}
            color={"#fff"}
          />
          <Btn1
            title={"MIXTO"}
            border={"0"}
            width={"100%"}
            bgColor={"#cfa50e"}
            color={"#fff"}
          />
        </article>
      </section>

      <section className="prices">
        <div className="subtotal">
          <span>
            Subtotal <strong>$10.000</strong>
          </span>
          <span>
            IIBB (3%): <strong>$0.000</strong>
          </span>
          <span>
            Total: <strong>$10.000</strong>
          </span>
        </div>
        <TotalSales />
      </section>
    </AreaKeyboard>
  );
}

const AreaKeyboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: ${({ theme }) => theme.bg};
  border-radius: 15px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
  padding: 10px;

  @media ${Device.desktop} {
    width: 400px;
    justify-content: space-between;
    padding: 20px;
  }

  .areaTypePayment {
    display: none;
    width: 100%;

    @media ${Device.desktop} {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .box {
      display: flex;
      gap: 15px;

      button {
        font-weight: 700;
        font-size: 14px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.1s;

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }

  .prices {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    .subtotal {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: ${({ theme }) => theme.text || "#555"};
      padding: 0 5px;

      span {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;

        strong {
          font-size: 16px;
          color: ${({ theme }) => theme.text || "#333"};
        }
      }

      @media ${Device.desktop} {
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;

        span {
          flex-direction: row;
          gap: 10px;
        }
      }
    }
  }
`;
