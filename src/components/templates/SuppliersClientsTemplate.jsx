import styled from "styled-components";
import {
  Btn1,
  RegisterSuppliersClients,
  Search,
  TableSuppliersClients,
  Title,
  useSuppliersClientsStore,
} from "../../index.js";
import { v } from "../../styles/variables.jsx";
import { useState } from "react";
import Confetti from "react-confetti-boom";
import { useLocation } from "react-router-dom";

export function SuppliersClientsTemplate() {
  const [openRegister, setOpenRegister] = useState(false);
  const [action, setAction] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);

  const { setType, dataSuppliersClients, setSearch, type } =
    useSuppliersClientsStore();

  const location = useLocation();

  function newRegister() {
    const type =
      location.pathname === "/configs/suppliers" ? "supplier" : "client";

    setType(type);
    setOpenRegister(true);
    setAction("Nuevo");
    setDataSelect([]);
    setIsExploding(false);
  }

  return (
    <Container>
      {openRegister && (
        <RegisterSuppliersClients
          setIsExploding={setIsExploding}
          onClose={() => setOpenRegister(!openRegister)}
          dataSelect={dataSelect}
          action={action}
        />
      )}
      <section className="area1">
        <Title>{type === "supplier" ? "Proveedores" : "Clientes"}</Title>
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
        <TableSuppliersClients
          setDataSelect={setDataSelect}
          setAction={setAction}
          setOpenRegister={setOpenRegister}
          data={dataSuppliersClients}
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
