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
import Confetti from "react-confetti-boom";
import { useLocation } from "react-router-dom";

export function CategoriesTemplate() {
  const [openRegister, setOpenRegister] = useState(false);
  const [action, setAction] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);

  const { dataCategories, setSearch } = useCategoriesStore();

  const location = useLocation();

  function newRegister() {
    setOpenRegister(!openRegister);
    setAction("Nuevo");
    setDataSelect([]);
    setIsExploding(false);
  }

  return (
    <Container>
      {openRegister && (
        <RegisterCategories
          setIsExploding={setIsExploding}
          onClose={() => setOpenRegister(!openRegister)}
          dataSelect={dataSelect}
          action={action}
        />
      )}
      <section className="area1">
        <Title>
          {location.pathname === "/configs/categories"
            ? "Categorías"
            : "Categorías"}
        </Title>
        <Btn1
          func={newRegister}
          bgColor={v.mainColor}
          title="Nuevo"
          icon={<v.addIcon />}
        />
      </section>

      <section className="area2">
        <Search setSearch={setSearch} />
      </section>

      <section className="main">
        {isExploding && <Confetti />}
        <TableCategorias
          setDataSelect={setDataSelect}
          setAction={setAction}
          setOpenRegister={setOpenRegister}
          data={dataCategories}
        />
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
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .area2 {
    grid-area: 2;
    /* background-color: rgba(47, 188, 101, 0.14); */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    grid-area: main;
    /* background-color: rgba(200, 21, 107, 0.14); */
  }
`;
