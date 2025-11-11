import styled from "styled-components";
import { GiPadlock } from "react-icons/gi";
import { BiCopyright } from "react-icons/bi";

export function FooterLogin() {
  return (
    <Container>
      <section className="lock">
        <GiPadlock />
        <span>
          Página creada por Mauro Altamirano.Dev. Si te interesa la web, podés
          comunicarte al número
          <br /> 3537559269
        </span>
      </section>
      <section className="rights">
        <span>MAURO ALTAMIRANO: 20-41279534-3</span>
        <div className="space"></div>
        <span>Todos los derechos reservados</span>
        <div className="space"></div>
        <span>
          <BiCopyright /> 2025 mauroaltamirano.dev
        </span>
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12.2px;
  color: #91a4b7;
  gap: 5px;
  .lock {
    border-bottom: 1px solid rgba(145, 164, 183, 0.3);
    gap: 5px;
    display: flex;
    align-items: center;
  }

  .rights {
    display: flex;
    justify-content: space-between;

    .space {
      display: flex;
      width: 1px;
      background-color: rgba(145, 164, 183, 0.3);
      margin-top: 4px;
      height: 80%;
      align-items: center;
    }
    span {
      margin: 5px;
    }
  }
`;
