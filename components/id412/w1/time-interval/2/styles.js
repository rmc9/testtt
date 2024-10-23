import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 10px;
  width: 90vmin;
  height: 90vmin;
`;

export const Cell = styled.div`
  width: 100%;
  height: 100%;
`;

export const Counter = styled.div`
  font-size: 15vw;
  color: white;
  font-weight: bold;
`;
