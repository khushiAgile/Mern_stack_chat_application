import styled from 'styled-components';

import { IProps } from '.';

// Styled component for the Avatar container
export const AvatarContainer = styled.div<IProps>`
  width: ${({ size }) => size ?? 50}px;
  height: ${({ size }) => size ?? 50}px;
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#c6aaff'};
  color: ${({ textColor }) => textColor ?? '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => (size ? size / 2.5 : 20)}px;
  font-weight: bold;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
`;

// Styled component for the Avatar image (if imageUrl is provided)
export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
