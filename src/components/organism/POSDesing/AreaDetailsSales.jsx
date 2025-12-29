import styled from "styled-components";
import { Device } from "../../../styles/breakpoints";
import {
  EmptyState,
  FormatNumber,
  useCompanyStore,
  useDetailsSalesStore,
  useSalesCartStore,
  useSalesStore,
} from "../../../index.js";
import { useQuery } from "@tanstack/react-query";
import { blurIn } from "../../../styles/keyframes.jsx";
import { Icon } from "@iconify/react";
import EmptyCart from "../../../assets/Empty Cart.json";

export function AreaDetailsSales() {
  const { showDetailsSales } = useDetailsSalesStore();
  const { idSale } = useSalesStore();
  const { items, addQuantityItem, removeQuantityItem, removeItem, total } =
    useSalesCartStore();
  const { companyData } = useCompanyStore();

  useQuery({
    queryKey: ["dataDetailsSale", idSale],
    queryFn: () => showDetailsSales({ id_sale: idSale }),
    enabled: idSale > 0,
  });

  const isEmpty = items.length === 0;

  return (
    <AreaDetails>
      <HeaderList>
        <span className="description">Descripción</span>
        <span className="center">Cant.</span>
        <span className="end">Total</span>
      </HeaderList>

      <ScrollContainer>
        {isEmpty ? (
          <EmptyState animation={EmptyCart} text="Carrito vacío" />
        ) : (
          items.map((item, index) => (
            <ItemSale key={item._id_product ?? index}>
              <div className="col-desc">
                <span className="name">{item._desc}</span>
                <span className="unit-price">
                  Precio sin impuestos:{" "}
                  {FormatNumber(
                    item._sale_price -
                      (item._sale_price * companyData?.value_tax) / 100,
                    companyData?.currency,
                    companyData?.iso,
                    2
                  )}
                </span>
                <span className="unit-price">
                  Precio con impuestos:{" "}
                  {FormatNumber(
                    item._sale_price,
                    companyData?.currency,
                    companyData?.iso,
                    2
                  )}
                </span>
              </div>

              <div className="col-qty">
                <button
                  className="btn-qty minus"
                  onClick={() => removeQuantityItem(item)}
                >
                  <Icon icon="tabler:minus" />
                </button>

                <span className="qty-value">{item._quantity}</span>

                <button
                  className="btn-qty plus"
                  onClick={() => addQuantityItem(item)}
                >
                  <Icon icon="tabler:plus" />
                </button>
              </div>

              <div className="col-total">
                <span className="total-price">
                  {FormatNumber(
                    item._sale_price * item._quantity,
                    companyData?.currency,
                    companyData?.iso,
                    2
                  )}
                </span>

                <button className="btn-delete" onClick={() => removeItem(item)}>
                  <Icon icon="ic:sharp-delete-forever" width={22} height={22} />
                </button>
              </div>
            </ItemSale>
          ))
        )}
      </ScrollContainer>
    </AreaDetails>
  );
}

const AreaDetails = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bg || "#fff"};
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const HeaderList = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: ${({ theme }) => theme.bg3 || "#f5f5f5"};
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#333"};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  .description {
    flex: 2;
    text-align: left;
  }
  .center {
    flex: 1;
    text-align: center;
  }
  .end {
    flex: 1;
    text-align: right;
  }
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
`;

const ItemSale = styled.article`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background: ${({ theme }) => theme.bg2 || "#fff"};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  border: 1px solid transparent;
  animation: ${blurIn} 0.4s ease-in-out;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: ${({ theme }) => theme.primary || "#33b81c"};
  }

  .col-desc {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;

    .name {
      font-size: 15px;
      font-weight: 600;
      color: ${({ theme }) => theme.text || "#333"};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .unit-price {
      font-size: 12px;
      color: #888;
      font-weight: 500;
    }
  }

  .col-qty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .btn-qty {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      background: ${({ theme }) => theme.bg3 || "#f0f0f0"};
      color: ${({ theme }) => theme.text || "#333"};
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;

      &:hover {
        background: ${({ theme }) => theme.primary || "#33b81c"};
        color: #fff;
        transform: scale(1.05);
      }
      &:active {
        transform: scale(0.95);
      }
    }

    .qty-value {
      font-weight: 700;
      font-size: 15px;
      color: ${({ theme }) => theme.text || "#333"};
      min-width: 24px;
      text-align: center;
    }
  }

  .col-total {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;

    .total-price {
      font-size: 16px;
      font-weight: 700;
      color: ${({ theme }) => theme.primary || "#33b81c"};
    }

    .btn-delete {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      color: #ff4d4f;
      padding: 6px;
      border-radius: 50%;
      transition: all 0.2s;
      opacity: 0.7;

      &:hover {
        background: #fff1f0;
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }

  @media ${Device.mobile} {
    padding: 10px;
    .col-desc .name {
      font-size: 14px;
    }
    .col-qty {
      gap: 4px;
      .btn-qty {
        width: 24px;
        height: 24px;
      }
    }
    .col-total .total-price {
      font-size: 14px;
    }
  }
`;
