import styled from "styled-components";
import { Btn1 } from "../../molecules/Btn1";
import { Device } from "../../../styles/breakpoints";
import { v } from "../../../styles/variables";
import { Icon } from "@iconify/react";

export function TotalSales() {
  return (
    <Total>
      <section className="image">
        <Icon
          icon="streamline-ultimate-color:accounting-bill-stack-1"
          width="42"
          height="42"
        />
      </section>
      <section className="contentTotal">
        <span>$10.000</span>
        <section className="contentTotalTitle">
          <Btn1
            title={"COBRAR"}
            bgColor={"#fff"}
            color={"rgb(38, 143, 0)"}
            icon={
              <Icon
                icon="streamline-ultimate-color:cash-payment-bills-1"
                width="24"
                height="24"
              />
            }
          />
          <Btn1
            title={"..."}
            bgColor={"#fff"}
            color={"rgb(38, 143, 0)"}
            icon={
              <Icon
                icon="streamline-ultimate-color:mobile-phone-blackberry-2"
                width="24"
                height="24"
              />
            }
          />
        </section>
      </section>
    </Total>
  );
}

const Total = styled.div`
  border-radius: 15px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 40px;
  background-color: rgb(38, 143, 0);
  padding: 10px;
  color: #e0ebc5;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: rgba(198, 229, 77, 0.2);
    position: absolute;
    border-radius: 50%;
    top: -20px;
    left: -15px;
  }

  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.bgTotal};
    position: absolute;
    border-radius: 50%;
    top: 5px;
    right: 5px;
  }

  .image {
    z-index: 1;
    width: 55px;
    position: relative;

    @media ${Device.desktop} {
      bottom: initial;
    }
    img {
      width: 100%;
    }
  }

  .contentTotal {
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    .contentTotalTitle {
      display: flex;
      align-items: center;
      margin-top: 10px;
      gap: 10px;

      @media ${Device.desktop} {
        display: none;
      }
    }
  }
`;
