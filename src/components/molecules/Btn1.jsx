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
  decoration,
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
      $decoration={decoration}
    >
      <section className="content">
        <Icono $color={color}>{icon}</Icono>
        {title && (
          <span className="btn">
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
  box-sizing: border-box;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 15px;
  border-radius: 16px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
  border: none;

  /* Modern 3D effect using box-shadow instead of border-bottom */
  box-shadow:
    0 4px 0 rgba(0, 0, 0, 0.15),
    0 5px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);

  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  overflow: hidden;

  /* Decoration 1: Subtle glow circle */
  &::before {
    content: "";
    display: ${(props) => props.$decoration};
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.15);
    position: absolute;
    border-radius: 50%;
    bottom: -20px;
    right: -20px;
    z-index: 0;
    pointer-events: none;
  }

  /* Decoration 2: Top gloss/shine */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 16px 16px 0 0;
    pointer-events: none;
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 6px 0 rgba(0, 0, 0, 0.15),
      0 10px 25px rgba(0, 0, 0, 0.2);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.15),
      0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &[disabled] {
    background-color: #646464;
    color: #a0a0a0;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    filter: grayscale(1);

    &::before,
    &::after {
      display: none;
    }
  }
`;
