import styled from "styled-components";
import { Icono } from "../../index.js";

export function Btn1({
  func,
  title,
  bgColor,
  icon,
  url,
  color,
  disabled,
  width,
  type = "button",
  border,
  height,
}) {
  return (
    <Container
      $width={width}
      disabled={disabled}
      $color={color}
      type={type}
      $bgColor={bgColor}
      onClick={func}
      $border={border}
      $height={height}
    >
      <section className="content">
        {icon && <Icono $color={color}>{icon}</Icono>}
        {title && (
          <span className="btn-text">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </span>
        )}
      </section>
    </Container>
  );
}

const Container = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Moderno y Minimalista */
  background-color: ${(props) => props.$bgColor || "#5D3FD3"};
  color: ${(props) => props.$color || "#fff"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "auto"};
  border: ${(props) => props.$border || "none"};

  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  padding: 12px 24px;
  border-radius: 8px; /* Bordes suavemente redondeados, más tech */

  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 6px -1px rgba(93, 63, 211, 0.2),
    0 2px 4px -1px rgba(93, 63, 211, 0.1);

  /* Hover sutil */
  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 15px -3px rgba(93, 63, 211, 0.3),
      0 4px 6px -2px rgba(93, 63, 211, 0.1);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }

  &[disabled] {
    background-color: #cbd5e1;
    color: #94a3b8;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .content {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
