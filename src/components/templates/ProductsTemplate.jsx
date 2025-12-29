import styled, { useTheme } from "styled-components";
import {
  Btn1,
  RegisterProducts,
  Search,
  TableProducts,
  Title,
  useCompanyStore,
  useProductsStore,
} from "../../index.js";
import { useEffect, useState } from "react";
import Confetti from "react-confetti-boom";
import { Icon } from "@iconify/react"; // Asumo que usas iconify por el contexto anterior, o v.addIcon
import { useLocation } from "react-router-dom";

export function ProductsTemplate() {
  const [openRegister, setOpenRegister] = useState(false);
  const [action, setAction] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);

  // Hooks de estado global
  const { productsData, setSearch, showProducts, codeGeneratorProd } =
    useProductsStore();
  const { companyData } = useCompanyStore();

  // Hook para acceder a los colores del tema actual (Light/Dark)
  const theme = useTheme();

  const location = useLocation();

  useEffect(() => {
    if (companyData?.id) {
      showProducts({ id_company: companyData.id });
    }
  }, [companyData?.id, showProducts]);

  function newRegister() {
    setOpenRegister(!openRegister);
    setAction("Nuevo");
    setDataSelect([]);
    setIsExploding(false);
    codeGeneratorProd();
  }

  return (
    <Container>
      {/* Modal de Registro */}
      {openRegister && (
        <RegisterProducts
          setIsExploding={setIsExploding}
          onClose={() => setOpenRegister(!openRegister)}
          dataSelect={dataSelect}
          action={action}
        />
      )}

      {/* Header Unificado: Título + Herramientas */}
      <HeaderSection>
        <div className="header-text">
          <Title>
            {" "}
            {location.pathname === "/configs/products"
              ? "Productos"
              : "Categorías"}
          </Title>
          <p className="subtitle">
            Gestiona tu catálogo, precios y stock en tiempo real.
          </p>
        </div>

        <div className="tools-bar">
          <div className="search-wrapper">
            <Search setSearch={setSearch} />
          </div>
          <Btn1
            func={newRegister}
            bgColor={theme.primary} // Usa el Violeta del tema, no el Naranja de 'v'
            color="#fff"
            title="Nuevo Producto"
            icon={<Icon icon="solar:add-circle-bold" width={20} />} // O <v.addIcon />
            width="180px"
          />
        </div>
      </HeaderSection>

      {/* Área Principal (Tabla) */}
      <MainSection>
        {isExploding && (
          <Confetti
            mode="boom"
            particleCount={50}
            shapeSize={15}
            colors={["#5D3FD3", "#FFC107", "#00D4FF"]}
          />
        )}

        <TableWrapper>
          <TableProducts
            setDataSelect={setDataSelect}
            setAction={setAction}
            setOpenRegister={setOpenRegister}
            data={productsData}
          />
        </TableWrapper>
      </MainSection>
    </Container>
  );
}

// --- STYLED COMPONENTS ---

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  background-color: ${({ theme }) => theme.bgTotal};
  color: ${({ theme }) => theme.text};
`;

const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 5px;

    // Asumiendo que Title es un h1 o similar, lo forzamos a alinear
    h1 {
      margin: 0;
      font-size: 24px;
    }

    .subtitle {
      color: ${({ theme }) => theme.colorSubtitle};
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
  }

  .tools-bar {
    display: flex;
    align-items: center;
    gap: 15px;

    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column-reverse;

      .search-wrapper,
      button {
        width: 100%;
      }
    }
  }

  .search-wrapper {
    min-width: 300px;
    // Ajuste para que el componente Search se vea bien
    div {
      margin: 0;
      background: ${({ theme }) => theme.bgCards};
    }
  }
`;

const MainSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* Evita doble scroll */
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bgCards};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.border};
`;

const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
  padding: 10px;

  /* Personalización del Scrollbar para que combine */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bgTotal};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colorScroll};
    border-radius: 4px;
  }
`;
