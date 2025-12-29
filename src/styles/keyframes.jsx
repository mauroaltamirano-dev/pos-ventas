import { keyframes } from "styled-components";

export const blurIn = keyframes`
  0%{
    filter: blur(10px);
    opacity: 0;
  }
  100%{
    filter: blur(0px);
    opacity: 1;
  }
`;

export const blurInSmooth = keyframes`
  0% { opacity: 0; transform: translateY(10px) scale(.97); filter: blur(8px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
`;

export const slideBackground = keyframes`
  0%{
  background-position: 120px 0;
  }
  100%{
  background-position: -120px 0;
  }  
`;
