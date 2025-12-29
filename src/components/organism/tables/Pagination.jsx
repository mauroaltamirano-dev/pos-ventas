import styled, { useTheme } from "styled-components";
import { Btn1 } from "../../../index";
// Usamos iconos modernos de react-icons para asegurar la estética (puedes usar v.icon si prefieres)
import {
  BiChevronsLeft,
  BiChevronLeft,
  BiChevronRight,
  BiChevronsRight,
} from "react-icons/bi";

export const Pagination = ({ table }) => {
  const theme = useTheme();

  return (
    <Container>
      <div className="pagination-group">
        {/* Ir al Inicio */}
        <Btn1
          disabled={!table.getCanPreviousPage()}
          func={() => table.setPageIndex(0)}
          bgColor={theme.bg2} // Fondo gris suave (Slate-100/800)
          color={theme.text} // Icono oscuro/claro según tema
          border={`1px solid ${theme.border}`}
          width="40px" // Hacemos el botón cuadrado
          icon={<BiChevronsLeft size={20} />}
        />

        {/* Anterior */}
        <Btn1
          disabled={!table.getCanPreviousPage()}
          func={() => table.previousPage()}
          bgColor={theme.bg2}
          color={theme.text}
          border={`1px solid ${theme.border}`}
          width="40px"
          icon={<BiChevronLeft size={20} />}
        />
      </div>

      <PageIndicator>
        <span className="text">Página</span>
        <span className="current">
          {table.getState().pagination.pageIndex + 1}
        </span>
        <span className="text">de {table.getPageCount()}</span>
      </PageIndicator>

      <div className="pagination-group">
        {/* Siguiente */}
        <Btn1
          disabled={!table.getCanNextPage()}
          func={() => table.nextPage()}
          bgColor={theme.bg2}
          color={theme.text}
          border={`1px solid ${theme.border}`}
          width="40px"
          icon={<BiChevronRight size={20} />}
        />

        {/* Ir al Final (Opcional, si tu tabla lo soporta) */}
        <Btn1
          disabled={!table.getCanNextPage()}
          func={() => table.setPageIndex(table.getPageCount() - 1)}
          bgColor={theme.bg2}
          color={theme.text}
          border={`1px solid ${theme.border}`}
          width="40px"
          icon={<BiChevronsRight size={20} />}
        />
      </div>
    </Container>
  );
};

// --- STYLED COMPONENTS ---

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Alineado a la derecha como en SaaS profesionales */
  gap: 20px;
  margin-top: 10px;
  padding: 10px 0;

  @media (max-width: 768px) {
    justify-content: center; /* Centrado en móvil */
    gap: 10px;
  }

  .pagination-group {
    display: flex;
    gap: 8px;
  }
`;

const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colorSubtitle};

  .current {
    background-color: ${({ theme }) =>
      theme.bg6}; /* Fondo violeta transparente */
    color: ${({ theme }) => theme.primary}; /* Texto Violeta */
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    min-width: 30px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.primary}30; /* Borde sutil */
  }

  .text {
    @media (max-width: 400px) {
      display: none; /* En pantallas muy pequeñas solo mostramos "1 de 10" o "1 / 10" */
    }
  }
`;
