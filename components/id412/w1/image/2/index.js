import React from "react";
import * as S from "./styles";

const images = ["/assets/id412/w1/images/1.webp", "/assets/id412/w1/images/2.webp", "/assets/id412/w1/images/3.webp", "/assets/id412/w1/images/4.webp"];

export default function ImageDisplay() {
  return (
    <S.ImageContainer>
      {images.map((src, index) => (
        <S.GridItem key={index}>
          <S.StyledImage src={src} alt={`Sample Image ${index + 1}`} />
        </S.GridItem>
      ))}
    </S.ImageContainer>
  );
}
