import styled from "styled-components";
import {
  Btn1,
  RegisterCategories,
  Search,
  TableCategorias,
  Title,
  useCategoriesStore,
} from "../../index.js";
import { v } from "../../styles/variables";
import { useState } from "react";

export function CategoriesTemplate() {
  const [openRegister, setOpenRegister] = useState(false);
  const [action, setAction] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const { dataCategories } = useCategoriesStore();

  function newRegister() {
    setOpenRegister(!openRegister);
    setAction("Nuevo");
    setDataSelect([]);
  }

  return (
    <Container>
      {openRegister && (
        <RegisterCategories dataSelect={dataSelect} action={action} />
      )}
      <section className="area1">
        <Title>Categorías</Title>
        <Btn1
          func={newRegister}
          bgColor={v.mainColor}
          title="Nuevo"
          icon={<v.addIcon />}
        />
      </section>

      <section className="area2">
        <Search />
      </section>

      <section className="main">
        <TableCategorias data={dataCategories} />
      </section>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  grid-template:
    "area1" 60px
    "area2" 60px
    "main" auto;

  .area1 {
    grid-area: 1;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }

  .area2 {
    grid-area: 2;
    background-color: rgba(47, 188, 101, 0.14);
    display: flex;
    justify-content: end;
    align-items: center;
  }

  .main {
    grid-area: main;
    background-color: rgba(200, 21, 107, 0.14);
  }
`;
