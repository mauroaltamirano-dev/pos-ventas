import styled from "styled-components";
import { Device } from "../../../styles/breakpoints";

export function AreaDetailsSales() {
  // Mock data for visualization
  const products = [
    {
      id: 1,
      description: "Coca Cola 2.25L",
      stock: 34,
      qty: 1,
      price: 3500,
      total: 3500,
    },
    {
      id: 2,
      description: "Galletitas Oreo 117g",
      stock: 12,
      qty: 2,
      price: 1200,
      total: 2400,
    },
    {
      id: 3,
      description: "Pan Lactal Blanco",
      stock: 5,
      qty: 1,
      price: 2800,
      total: 2800,
    },
    {
      id: 4,
      description: "Leche La Serenísima 1L",
      stock: 20,
      qty: 3,
      price: 1500,
      total: 4500,
    },
    {
      id: 5,
      description: "Cerveza Quilmes 473ml",
      stock: 48,
      qty: 6,
      price: 1100,
      total: 6600,
    },
    {
      id: 6,
      description: "Papas Lays Clásicas",
      stock: 15,
      qty: 1,
      price: 2100,
      total: 2100,
    },
    {
      id: 7,
      description: "Agua Mineral Villavicencio",
      stock: 30,
      qty: 2,
      price: 900,
      total: 1800,
    },
  ];

  return (
    <AreaDetails>
      <HeaderList>
        <span>Descripción</span>
        <span className="center">Cant.</span>
        <span className="end">Total</span>
      </HeaderList>
      <ScrollContainer>
        {products.map((product) => (
          <ItemSale key={product.id}>
            <div className="product-info">
              <span className="description">{product.description}</span>
              <span className="stock">Stock: {product.stock} u.</span>
            </div>
            <div className="product-details">
              <div className="qty-price">
                <span className="qty">x{product.qty}</span>
                <span className="price">${product.price}</span>
              </div>
              <span className="total">${product.total}</span>
            </div>
          </ItemSale>
        ))}
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
  justify-content: space-between;
  padding: 15px 20px;
  background: ${({ theme }) => theme.bg3 || "#f5f5f5"};
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#333"};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  span {
    flex: 1;
  }
  .center {
    text-align: center;
  }
  .end {
    text-align: end;
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
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: ${({ theme }) => theme.bg2 || "#fff"};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
  border-left: 4px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border-left: 4px solid ${({ theme }) => theme.primary || "#33b81c"};
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 2;

    .description {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.text || "#333"};
    }
    .stock {
      font-size: 12px;
      color: #888;
    }
  }

  .product-details {
    display: flex;
    align-items: center;
    gap: 20px;
    flex: 1;
    justify-content: flex-end;

    .qty-price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .qty {
        font-weight: 700;
        color: ${({ theme }) => theme.primary || "#33b81c"};
      }
      .price {
        font-size: 12px;
        color: #888;
      }
    }

    .total {
      font-size: 18px;
      font-weight: 800;
      color: ${({ theme }) => theme.text || "#333"};
      min-width: 80px;
      text-align: right;
    }
  }

  @media ${Device.mobile} {
    .product-details {
      gap: 10px;
      .total {
        font-size: 16px;
      }
    }
  }
`;
