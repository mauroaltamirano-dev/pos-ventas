import styled from "styled-components";
import { useAuthStore, useUserStore } from "../../index.js";
import { v } from "../../styles/variables";
import { useNavigate } from "react-router-dom";

export function Welcome() {
  const { logoutSession } = useAuthStore();
  const { users } = useUserStore();
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <Header>
          <Title>
            Bienvenido,{" "}
            <span className="highlight">{users?.name || "Usuario"}</span>
          </Title>
          <Subtitle>Sistema POS Ventas con React.js</Subtitle>
        </Header>

        <Grid>
          <Card onClick={() => navigate("/pos")}>
            <IconWrapper $color="#53B257">
              <v.priceSoldIcon />
            </IconWrapper>
            <CardTitle>Ventas</CardTitle>
          </Card>

          <Card onClick={() => navigate("/configs/products")}>
            <IconWrapper $color="#F98733">
              <v.barcodeIcon />
            </IconWrapper>
            <CardTitle>Productos</CardTitle>
          </Card>

          <Card onClick={() => navigate("/configs/categories")}>
            <IconWrapper $color="#1cb0f6">
              <v.categoryIcon />
            </IconWrapper>
            <CardTitle>Categorías</CardTitle>
          </Card>

          <Card onClick={() => navigate("/configs")}>
            <IconWrapper $color="#525252">
              <v.settingsIcon />
            </IconWrapper>
            <CardTitle>Configuración</CardTitle>
          </Card>
        </Grid>

        <Footer>
          <LogoutButton onClick={logoutSession}>
            <v.logoutIcon />
            <span>Cerrar Sesión</span>
          </LogoutButton>
        </Footer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bgTotal};
  padding: 20px;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;

  .highlight {
    background: linear-gradient(90deg, #f98733, #dac1ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 900px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.bgCards};
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) =>
    theme.boxShadow || "0 10px 20px rgba(0,0,0,0.05)"};
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => `${$color}20`};
  padding: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
    background: ${({ $color }) => `${$color}30`};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Footer = styled.div`
  margin-top: 20px;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 77, 77, 0.3);

  &:hover {
    background: #ff3333;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 77, 77, 0.4);
  }

  svg {
    font-size: 1.2rem;
  }
`;
