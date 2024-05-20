import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  background: #f5f5f5;
  padding: 20px;
  font-family: "Roboto", sans-serif;
  color: #333;
`;

export const Comp = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;

  h1 {
    background: #6200ea;
    color: #fff;
    padding: 15px 20px;
    margin: 0;
    font-size: 1.5em;
    font-weight: 500;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  a {
    display: block;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    color: #6200ea;
    text-decoration: none;
    font-size: 1.1em;
    border-bottom: 1px solid #eee;
    transition: background 0.3s, padding-left 0.3s;

    &:hover {
      background: #f1f1f1;
      padding-left: 30px;
    }
  }

  &:last-child a {
    padding-bottom: 50px;
    border-bottom: none;
  }
`;
