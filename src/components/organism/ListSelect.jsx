import styled from "styled-components";
import { Device } from "../../styles/breakpoints";
import { useEffect, useRef, useState } from "react";

export function ListSelect({
  data,
  setState,
  func,
  scroll,
  top,
  state,
  refetch,
  functionCrud,
}) {
  if (!state) return;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropDownRef = useRef(null);

  function selection(p) {
    if (refetch) {
      refetch();
    }

    func(p); // selectProducts

    if (functionCrud) {
      functionCrud(p); // <-- le pasamos el PRODUCTO REAL
    }

    setState();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      selection(data[selectedIndex]);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex + 1
      );
    }
  };

  useEffect(() => {
    dropDownRef.current.focus();
  }, []);

  return (
    <Container
      scroll={scroll}
      $top={top}
      ref={dropDownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <section className="contentClose" onClick={setState}>
        x
      </section>
      <section className="contentItems">
        {data?.map((item, index) => {
          return (
            <ItemContainer
              key={index}
              onClick={() => selection(item)}
              style={{
                backgroundColor:
                  index === selectedIndex ? "#f5f5f5" : "transparent",
              }}
            >
              <span>🌫️</span>
              <span>{item?.name}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  top: ${(props) => props.$top};
  width: 95%;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
  height: 230px;
  overflow-y: auto;
  @media ${() => Device.tablet} {
  }
  .contentClose {
    font-weight: 700;
    cursor: pointer;
    font-size: 20px;
  }
  .contentItems {
    overflow-y: ${(props) => props.scroll};
  }
`;
const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.bgTotal};
  }
`;
