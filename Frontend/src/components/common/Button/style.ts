import { device } from 'style/breakpoints';

import styled from 'styled-components';

export const Wrapper = styled.button`
  &.disabled {
    opacity: 0.6;
  }

  display: inline-block;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  padding: 14px 0;
  width: 150px;

  &.btnPrimary {
    color: #fff;
    background-color: rebeccapurple;
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0px 4px 8px rgba(67, 67, 67, 0.4);
    }
  }

  &.btnSecondary {
    background: transparent;
    border: 1px solid #f3f3f3;
    color: #f3f3f3;
  }

  @media only screen and (${device.xs}) {
    padding: 12px 0;
  }
`;
