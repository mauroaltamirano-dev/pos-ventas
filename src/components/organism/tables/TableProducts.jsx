/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import styled, { useTheme } from "styled-components";
import {
  ContentActionTable,
  Pagination,
  useProductsStore,
  Checkbox1,
} from "../../../index.js";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables.jsx";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Iconos más limpios

export function TableProducts({
  data,
  setOpenRegister,
  setDataSelect,
  setAction,
}) {
  if (data === null) return null;
  const [page, setPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState([]);
  const theme = useTheme(); // Accedemos al tema para SweetAlert

  const { deleteProducts } = useProductsStore();

  function deleteProduct(p) {
    if (p.nombre === "General") {
      Swal.fire({
        icon: "error",
        title: "Acción denegada",
        text: "El registro por defecto no se puede eliminar.",
        confirmButtonColor: theme.primary,
      });
      return;
    }
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.delete || "#EF4444", // Rojo de alerta
      cancelButtonColor: theme.textInput,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: theme.bgCards,
      color: theme.text,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProducts({ id: p.id });
        Swal.fire({
          title: "Eliminado",
          text: "El producto ha sido eliminado.",
          icon: "success",
          confirmButtonColor: theme.primary,
          background: theme.bgCards,
          color: theme.text,
        });
      }
    });
  }

  function edit(data) {
    if (data.nombre === "General") {
      Swal.fire({
        icon: "warning",
        title: "Protegido",
        text: "Este registro es de sistema y no debe modificarse.",
        confirmButtonColor: theme.primary,
      });
      return;
    }
    setOpenRegister(true);
    setDataSelect(data);
    setAction("Edit");
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Producto",
      cell: (info) => (
        <div data-title="Producto" className="ContentCell font-bold">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "p_sale",
      header: "$ Venta",
      cell: (info) => (
        <div data-title="Precio Venta" className="ContentCell">
          <span className="price-tag">{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "p_buy",
      header: "$ Compra",
      cell: (info) => (
        <div data-title="Precio Compra" className="ContentCell">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "internal_code",
      header: "Cód. Interno",
      cell: (info) => (
        <div data-title="Código" className="ContentCell">
          <span className="code-badge">{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "for_sale",
      header: "Tipo",
      cell: (info) => (
        <div data-title="Tipo" className="ContentCell">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "inventory_manager",
      header: "Control Stock",
      cell: (info) => (
        <div data-title="Stock" className="ContentCell center-item">
          <Checkbox1 isChecked={info.getValue()} onChange={() => {}} disabled />
        </div>
      ),
    },
    {
      accessorKey: "acciones",
      header: "",
      enableSorting: false,
      cell: (info) => (
        <div data-title="Acciones" className="ContentCell actions-cell">
          <ContentActionTable
            functionEdit={() => edit(info.row.original)}
            functionDelete={() => deleteProduct(info.row.original)}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <Container>
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ width: header.getSize() }}>
                    <div
                      className="header-content"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Iconos de Ordenamiento Lógicos */}
                      {header.column.getCanSort() && (
                        <span className="sort-icon">
                          {{
                            asc: <FaSortUp />,
                            desc: <FaSortDown />,
                          }[header.column.getIsSorted()] ?? (
                            <FaSort className="sort-neutral" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationContainer>
        <Pagination
          table={table}
          irinicio={() => table.setPageIndex(0)}
          page={table.getState().pagination.pageIndex + 1}
          setPage={setPage}
          maximo={table.getPageCount()}
        />
      </PaginationContainer>
    </Container>
  );
}

// --- STYLED COMPONENTS ---

// --- STYLED COMPONENTS ---

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .table-wrapper {
    width: 100%;
  }

  /* Estilos generales de la tabla */
  .responsive-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    thead {
      background-color: ${({ theme }) => theme.bg2};
      border-radius: 8px;

      th {
        padding: 16px;
        text-align: left;
        color: ${({ theme }) => theme.colorSubtitleCard};
        font-weight: 600;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;

        .header-content {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;

          &:hover {
            color: ${({ theme }) => theme.primary};
          }
        }

        .sort-icon {
          font-size: 12px;
          color: ${({ theme }) => theme.primary};
        }
        .sort-neutral {
          color: ${({ theme }) => theme.colorScroll};
          opacity: 0.5;
        }
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid ${({ theme }) => theme.border};
        transition: background-color 0.2s;

        &:hover {
          background-color: ${({ theme }) => theme.bgActive};
        }

        td {
          padding: 14px 16px;
          color: ${({ theme }) => theme.text};
          vertical-align: middle;
        }
      }
    }

    /* Estilos específicos de celdas */
    .font-bold {
      font-weight: 600;
      color: ${({ theme }) => theme.text};
    }

    .price-tag {
      font-family: "Inter", sans-serif;
      font-weight: 500;
    }

    .code-badge {
      background-color: ${({ theme }) => theme.bg2};
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      color: ${({ theme }) => theme.colorSubtitle};
      border: 1px solid ${({ theme }) => theme.border};
    }

    /* --- RESPONSIVE / MOBILE CARD VIEW --- */
    @media (max-width: 768px) {
      tbody,
      tr,
      td {
        display: block;
        width: 100%;
      }

      tr {
        margin-bottom: 15px;
        background-color: ${({ theme }) => theme.bgCards};
        border-radius: 12px;
        border: 1px solid ${({ theme }) => theme.border};
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
        padding: 15px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      td {
        padding: 0; /* Quitamos padding del TD para que el ContentCell maneje el espacio */
        border-bottom: 1px solid ${({ theme }) => theme.bgTotal};

        &:last-child {
          border-bottom: none;
        }
      }

      /* AQUÍ ESTÁ LA CORRECCIÓN */
      /* Apuntamos al .ContentCell que es quien tiene el atributo data-title */
      .ContentCell {
        display: flex;
        justify-content: space-between; /* Esto manda el título a la izquierda y el valor a la derecha */
        align-items: center;
        width: 100%;
        padding: 10px 0;

        /* El pseudo-elemento crea el texto del título basándose en el atributo del div */
        &::before {
          content: attr(data-title);
          font-weight: 600;
          color: ${({ theme }) => theme.colorSubtitle};
          font-size: 13px;
          text-align: left;
        }
      }

      /* Ajustes específicos para alinear el contenido a la derecha */
      .ContentCell span,
      .ContentCell .price-tag,
      .ContentCell .code-badge {
        text-align: right;
      }

      .actions-cell {
        justify-content: center; /* Las acciones centradas se ven mejor */
        &::before {
          content: none; /* No queremos título en la fila de botones */
        }
      }
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
