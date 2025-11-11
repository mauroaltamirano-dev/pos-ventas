import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
// eslint-disable-next-line no-unused-vars
import { v } from "../../styles/variables";
import "react-lazy-load-image-component/src/effects/blur.css";

export function ImageContent({ image }) {
  return (
    <Container>
      <LazyLoadImage
        placeholderSrc={<v.reactIcon />}
        effect="blur"
        src={image}
        width={50}
        height={50}
      ></LazyLoadImage>
    </Container>
  );
}

const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10%;
  overflow: hidden;
  img {
    object-fit: cover;
  }
`;
