import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import { v } from "../../styles/variables";

export function Search({ setSearch }) {
  function searching(e) {
    setSearch(e.target.value);
  }

  return (
    <Container>
      <section className="content">
        <v.searchIcon className="icon" />
        <input placeholder="Buscar..." onChange={searching} />
      </section>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 10px;
  height: 60px;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  border: 2px solid ${({ theme }) => theme.color2};

  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;

    .icon {
      font-size: 20px;
    }

    input {
      font-size: 20px;
      width: 100%;
      outline: none;
      background: none;
      border: 0;
      color: ${(props) => props.theme.text};
    }
  }
`;
