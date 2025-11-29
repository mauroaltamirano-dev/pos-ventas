import styled from "styled-components";
import { Device } from "../../styles/breakpoints";

export function ListSelect({
  data,
  setState,
  func,
  scroll,
  top,
  state,
  refetch,
}) {
  if (!state) return;
  function selection(p) {
    if (refetch) {
      refetch();
    }

    func(p);
    setState();
  }
  return (
    <Container scroll={scroll} $top={top}>
      <section className="contentClose" onClick={setState}>
        x
      </section>
      <section className="contentItems">
        {data?.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => selection(item)}>
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
