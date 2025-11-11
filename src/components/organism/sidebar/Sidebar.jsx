import styled, { useTheme } from "styled-components";
import {
  LinksArray,
  SecondaryLinksArray,
  ToggleTheme,
} from "../../../index.js";
import { v } from "../../../styles/variables";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

export function Sidebar({ state, setState }) {
  const theme = useTheme();

  return (
    <Main $isopen={state.toString()}>
      <span className="sidebarButton" onClick={() => setState(!state)}>
        {<v.arrowRightIcon />}
      </span>

      <Container $isopen={state.toString()} className={state ? "active" : ""}>
        <div className="logoContent">
          <div className="imgContent">
            <img src={theme.logo} alt="Logo" />
          </div>
          <h2>Mauro.Dev</h2>
        </div>

        {LinksArray.map(({ icon, label, to }) => (
          <div
            className={state ? "linkContainer active" : "linkContainer"}
            key={label}
          >
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? ` active` : ``}`}
            >
              <section className={state ? "content open" : "content"}>
                <Icon className="linkIcon" icon={icon} />
                <span className={state ? "showLabel" : "hiddenLabel"}>
                  {label}
                </span>
              </section>
            </NavLink>
          </div>
        ))}

        <Divider />

        {SecondaryLinksArray.map(({ icon, label, to, color }) => (
          <div className="linkContainer" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? ` active` : ``}`}
            >
              <section className={state ? "content open" : "content"}>
                <Icon color={color} className="linkIcon" icon={icon} />
                <span className={state ? "showLabel" : "hiddenLabel"}>
                  {label}
                </span>
              </section>
            </NavLink>
          </div>
        ))}

        <div className="linkContainer">
          <div className="links">
            <section className={state ? "content open" : "content"}>
              <Icon
                color="#CE82FF"
                className="linkIcon"
                icon="heroicons:ellipsis-horizontal-circle-solid"
              />
              <span className={state ? "showLabel" : "hiddenLabel"}>MÁS</span>
            </section>
          </div>
        </div>

        <div className="toggleTheme">
          <ToggleTheme />
        </div>
      </Container>
    </Main>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.bgTotal};
  color: ${(props) => props.theme.text};
  position: fixed;
  height: 100%;
  padding-top: 20px;
  z-index: 2;
  width: 88px;
  transition: 0.1s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 2px solid ${({ theme }) => theme.color2};

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colorScroll};
    border-radius: 10px;
  }

  &.active {
    width: 260px;
  }

  .logoContent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;
    padding-top: 10px;
    .imgContent {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      cursor: pointer;
      transition: 0.3s ease;
      transform: ${({ $isopen }) =>
          $isopen === "true" ? "scale(0.7)" : "scale(1.5)"}
        rotate(${({ theme }) => theme.logoRotate});
      img {
        width: 100%;
        animation: flotar 1.7s ease-in-out infinite alternate;
      }
    }

    h2 {
      color: #f88533;
      display: ${({ $isopen }) => ($isopen === "true" ? "block" : "none")};
    }
  }

  .linkContainer {
    margin: 9px 0;
    transition: all 0.3s ease-in-out;
    padding: 0 5%;
    position: relative;
    text-transform: uppercase;
    font-weight: 700;
  }

  .links {
    border-radius: 12px;
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
    color: ${(props) => props.theme.text};
    height: 60px;
    position: relative;
    .content {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;

      .linkIcon {
        display: flex;
        font-size: 33px;

        svg {
          font-size: 25px;
        }
      }
    }

    &.active {
      background: ${(props) => props.theme.bgActive};
      border: 1px solid ${(props) => props.theme.borderActive};
      color: ${(props) => props.theme.textActive};
      transition: all 0.3s ease;
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: ${({ $isopen }) =>
        $isopen === "true" ? "flex-start" : "center"};
      width: 100%;
      gap: ${({ $isopen }) => ($isopen === "true" ? "18px" : "0")};
      padding-left: ${({ $isopen }) => ($isopen === "true" ? "12px" : "0")};

      .linkIcon {
        font-size: 28px;
      }

      .showLabel {
        opacity: 1;
        display: inline;
        transition: opacity 0.3s ease;
      }
      .hiddenLabel {
        display: none;
        opacity: 0;
      }
    }
  }

  .toggleTheme {
    display: flex;
    justify-content: center;
  }
  @keyframes flotar {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-6px);
    }
  }
`;

const Main = styled.div`
  .sidebarButton {
    position: fixed;
    top: 70px;
    left: 68px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgTgDerecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 3;
    transform: ${({ $isopen }) =>
      $isopen === "true" ? `translateX(173px) rotate(3.142rad)` : `initial`};
    color: ${(props) => props.theme.text};
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;
