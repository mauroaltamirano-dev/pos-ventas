import styled from "styled-components";
import { ActionTable } from "../../../index";
// eslint-disable-next-line no-unused-vars
import { v } from "../../../styles/variables";
import { Icon } from "@iconify/react";

export function ContentActionTable({ functionEdit, functionDelete }) {
  return (
    <Container>
      <ActionTable
        func={functionEdit}
        fontSize="24px"
        color="#7d7d7d"
        icon={<v.editTableIcon />}
      />
      <ActionTable
        func={functionDelete}
        fontSize="20px"
        color="#f76e8e"
        icon={<Icon icon="meteor-icons:trash-can" width="24" height="24" />}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  @media (max-width: 48em) {
    justify-content: end;
  }
`;
