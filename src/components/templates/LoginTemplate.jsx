import styled, { useTheme } from "styled-components";
import {
  Title,
  InputText2,
  Btn1,
  Line,
  FooterLogin,
  useAuthStore,
} from "../../index.js";
// eslint-disable-next-line no-unused-vars
import { v } from "../../index.js";
import { Device } from "../../styles/breakpoints.jsx";

export function LoginTemplate() {
  const { loginGoogle } = useAuthStore();
  const theme = useTheme();
  return (
    <Container>
      <div className="card">
        <ContentLogo>
          <img src={theme.logo} alt="Logo de la empresa" />
          <span>MauroAltamirano.dev</span>
        </ContentLogo>
        <Title $paddingBottom="20px">Ingresar</Title>
        <form>
          <InputText2>
            <input className="form__field" placeholder="email" type="text" />
          </InputText2>

          <InputText2>
            <input
              className="form__field"
              placeholder="contraseña"
              type="password"
            />
          </InputText2>

          <Btn1 title="INGRESAR" bgColor="#1CB0F6" color="" width="100%" />
        </form>
        <Line>
          <span>0</span>
        </Line>
        <Btn1
          func={loginGoogle}
          title="Google"
          bgColor="#fff"
          color="60,60,60"
          icon={<v.googleIcon />}
        />
      </div>
      <FooterLogin />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 0 20px;
  color: ${({ theme }) => theme.text};

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 18px;
    @media ${Device.tablet} {
      width: 400px;
    }

    input {
      color: ${({ theme }) => theme.textInput};
    }
  }
`;

const ContentLogo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  span {
    font-weight: 700;
  }
  img {
    width: 10%;
    margin-right: 20px;
  }
`;
