import styled from "styled-components";
import { Icon } from "@iconify/react";
import { FormatNumber } from "../../index.js";
import { memo } from "react";

function ItemSalePOSBase({ item, add, remove, deleteItem }) {
  return (
    <Item>
      <div className="col-desc">
        <span className="name">{item._name}</span>
        <span className="unit">Unit: {FormatNumber(item._sale_price)}</span>
      </div>

      <div className="col-qty">
        <button onClick={() => remove(item)} className="qty-btn">
          <Icon icon="tabler:minus" />
        </button>

        <span className="qty">{item._quantity}</span>

        <button onClick={() => add(item)} className="qty-btn">
          <Icon icon="tabler:plus" />
        </button>
      </div>

      <div className="col-total">
        <span className="total">
          {FormatNumber(item._sale_price * item._quantity)}
        </span>

        <button className="delete-btn" onClick={() => deleteItem(item)}>
          <Icon icon="ic:sharp-delete-forever" width={24} height={24} />
        </button>
      </div>
    </Item>
  );
}

export const ItemSalePOS = memo(ItemSalePOSBase);

const Item = styled.article`
  display: flex;
  background: ${({ theme }) => theme.bg2};
  border-radius: 12px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  .col-desc {
    flex: 2;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .name {
      font-weight: 600;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .unit {
      font-size: 12px;
      color: #888;
    }
  }

  .col-qty {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 6px;
    align-items: center;

    .qty-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: ${({ theme }) => theme.bg3};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;

      &:active {
        transform: scale(0.9);
      }
    }

    .qty {
      font-weight: 700;
      min-width: 24px;
      text-align: center;
    }
  }

  .col-total {
    flex: 1;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;

    .total {
      color: ${({ theme }) => theme.primary};
      font-weight: 700;
      font-size: 16px;
    }

    .delete-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      color: #ff4d4d;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
