import Lottie from "lottie-react";
import styled from "styled-components";

export function EmptyState({ animation, text }) {
  return (
    <Wrapper>
      <Lottie animationData={animation} loop autoplay style={{ width: 260 }} />
      {text && <p>{text}</p>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  user-select: none;

  p {
    margin-top: 10px;
    font-weight: 600;
    color: #777;
  }
`;
