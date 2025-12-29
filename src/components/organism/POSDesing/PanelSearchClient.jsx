import { Icon } from "@iconify/react";
import styled from "styled-components";
import { Search } from "../Search";

export function PanelSearchClient({
  setStateSearcher,
  setSearch,
  displayField,
  data,
  selector,
}) {
  return (
    <Container>
      <div className="header-search">
        <button className="back-btn" onClick={() => setStateSearcher(false)}>
          <Icon icon="solar:alt-arrow-left-linear" width={24} />
        </button>
        <div className="search-wrapper">
          <Search setSearch={setSearch} />
        </div>
      </div>

      <ResultsList>
        {data?.length > 0 ? (
          data.map((item, index) => (
            <Item
              onClick={() => {
                selector(item); // Ejecuta selectSuppliersClients(item)
                setStateSearcher(false);
              }}
              key={item.id || index}
            >
              <Icon icon="solar:user-rounded-bold" className="user-icon" />
              <div className="info">
                <span className="main-text">{item[displayField]}</span>
                <span className="sub-text">
                  {item.national_identifier || "S/D"}
                </span>
              </div>
            </Item>
          ))
        ) : (
          <EmptyState>No se encontraron resultados</EmptyState>
        )}
      </ResultsList>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.bgTotal};
  z-index: 100;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .header-search {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    .back-btn {
      background: none;
      border: none;
      color: ${({ theme }) => theme.text};
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .search-wrapper {
      flex: 1;
    }
  }
`;

const ResultsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled.div`
  padding: 12px 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: ${({ theme }) => theme.bgCards};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s;
  cursor: pointer;

  .user-icon {
    color: ${({ theme }) => theme.primary};
    opacity: 0.7;
  }

  .info {
    display: flex;
    flex-direction: column;
    .main-text {
      font-weight: 600;
      color: ${({ theme }) => theme.text};
    }
    .sub-text {
      font-size: 12px;
      color: ${({ theme }) => theme.colorSubtitle};
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.bg6};
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colorSubtitle};
  font-size: 14px;
`;
