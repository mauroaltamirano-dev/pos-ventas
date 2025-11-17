// eslint-disable-next-line no-unused-vars
import { v } from "../../../styles/variables";
import styled from "styled-components";
import { Btn1 } from "../../../index";
export const Pagination = ({ table }) => {
  return (
    <Container>
      <Btn1
        disabled={!table.getCanPreviousPage()}
        func={() => table.setPageIndex(0)}
        bgColor="#F3D20C"
        icon={<v.firstPageIcon />}
      />

      <Btn1
        disabled={!table.getCanPreviousPage()}
        func={() => table.previousPage()}
        bgColor="#F3D20C"
        icon={<v.arrowLeftIcon />}
      />

      <span>{table.getState().pagination.pageIndex + 1}</span>
      <p> de {table.getPageCount()} </p>

      <Btn1
        disabled={!table.getCanNextPage()}
        func={() => table.nextPage()}
        bgColor="#F3D20C"
        icon={<v.arrowRightIcon />}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
