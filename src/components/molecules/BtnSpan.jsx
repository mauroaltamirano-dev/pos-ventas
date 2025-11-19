import styled from "styled-components";
import { Icono } from "../../index.js";

export function BtnSpan({
  func,
  title,
  bgColor,
  icon,
  url,
  color,
  disabled,
  width,
  type = "button",
}) {
  return (
    <Container
      $width={width}
      disabled={disabled}
      $color={color}
      type={type}
      $bgColor={bgColor}
      onClick={func}
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

const Container = styled.div`
  box-sizing: border-box;
  font-weight: 700;
  display: flex;
  padding: 12px 20px 12px 12px;
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 16px;
  background-color: ${(props) => props.$bgColor};
  border: 2px solid rgba(50, 50, 50, 0.2);
  border-bottom: 5px solid rgba(50, 50, 50, 0.2);
  transform: translate(0 -3px);
  cursor: pointer;
  transition: 0.2s;
  transition-timing-function: linear;
  color: rgb(${(props) => props.$color});
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width};

  .content {
    display: flex;
    gap: 12px;
  }
  &:active {
    transform: translate(0, 0);
    border-bottom: 2px solid rgba(50, 50, 50, 0.2);
  }
  &[disabled] {
    background-color: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;
