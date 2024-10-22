import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const PuzzleContainer = styled.div`
  width: 100vw;
  ${FlexCenterStyle};
  min-height: 100vh;
  overflow-y: scroll;
  flex-direction: column;
  padding: 0;
  font-family: "Times New Roman", Times, serif;
  margin: 0;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 24px;
`;

export const ScoreDisplay = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const GridWrapper = styled.div`
  width: 100vw;
  height: 100vw;
  border: 1px solid #333;
  margin: 0;
  cursor: crosshair;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(100, 1vw);
  grid-template-rows: repeat(100, 1vw);
  width: 100vw;
  height: 100vw;
  margin: 0;
`;

export const Cell = styled.div`
  width: 1vw;
  height: 1vw;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7vw;
  background-color: ${(props) => (props.$revealed ? "#ff0000" : "white")};
  color: ${(props) => (props.$revealed ? "white" : "black")};
  font-weight: ${(props) => (props.$revealed ? "bold" : "normal")};
  transition: all 0.1s ease;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

export const Button = styled.button`
  background-color: white;
  border: 1px solid #333;
  color: #333;
  padding: 5px 10px;
  text-align: center;
  font-size: 14px;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Message = styled.p`
  font-size: 24px;
  margin-top: 20px;
  color: #ff0000;
  font-weight: bold;
`;

export const WordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  max-width: 100vw;
`;

export const Word = styled.span`
  font-size: 14px;
  color: ${(props) => (props.$found ? "#006400" : "#333")};
  text-decoration: ${(props) => (props.$found ? "line-through" : "none")};
`;

export const CanvasWrapper = styled.div`
  border: 1px solid #333;
  cursor: crosshair;
`;
