import styled, { css, keyframes } from "styled-components";

export const FlexCenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WholeContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
`;

export const WContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${({ theme }) => theme.windowWidth / 3}px;
  height: ${({ theme }) => theme.windowHeight / 3}px;
  transform-origin: 0 0;
  transform: scale(3);
`;

export const MobileContainer = css`
  position: absolute;
  top: 0;
  left: ${({ theme }) => (theme.windowWidth > 768 ? (theme.windowWidth - 768) / 2 : 0)}px;
  overflow: hidden;
  overflow-y: scroll;
  width: ${({ theme }) => (theme.windowWidth > 768 ? 768 : theme.windowWidth)}px;
  height: ${({ theme }) => theme.windowHeight}px;
`;

export const MobileFlex = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const DefaultContainer = styled.div`
  ${WholeContainer};
`;

export const DefaultBlackContianer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  background: black;
  color: white;
  font-size: 12px;
`;

export const Appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
