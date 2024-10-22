import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled, { keyframes } from "styled-components";

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 182, 193, 0.7); }
  50% { box-shadow: 0 0 20px rgba(255, 182, 193, 0.9); }
  100% { box-shadow: 0 0 10px rgba(255, 182, 193, 0.7); }
`;

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: difference;
`;

export const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$gridSize}, ${100 / props.$gridSize}vw)`};
  grid-template-rows: ${(props) => `repeat(${props.$gridSize}, ${100 / props.$gridSize}vh)`};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 1 / 1;
`;

export const GridItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: ${(props) => `scaleX(${props.$reverseX ? -1 : 1}) scaleY(${props.$reverseY ? -1 : 1})`};
  transition: all 0.3s ease-in-out;

  &:hover {
    z-index: 10;
    transform: ${(props) => `scaleX(-1) scaleY(-1)`};
    animation: ${glowAnimation} 1.5s infinite;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;

  &:hover {
    /* Uncomment one of these filters or combine them as desired */
    filter: hue-rotate(90deg); /* Changes hue */
    /* filter: sepia(100%); */ /* Applies sepia effect */
    /* filter: saturate(200%); */ /* Increases saturation */
    /* filter: hue-rotate(90deg) saturate(150%); */ /* Combines hue change and increased saturation */
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${GridItem}:hover & {
    opacity: 1;
  }
`;

export const OverlayText = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 1.5vw;
  font-weight: 300;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.3s ease-in-out;

  ${GridItem}:hover & {
    opacity: 1;
    bottom: 15%;
  }
`;
