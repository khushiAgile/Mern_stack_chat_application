import { device } from 'style/breakpoints';

import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 48px;

  .formLabel {
    position: absolute;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    left: 27px;
    top: 16px;
    padding: 0 4px;
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    color: black;
    background-color: #e3d5ff;
  }
  .formInput {
    position: absolute;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    top: 0;
    left: 0;
    /* z-index: 1; */
    resize: none;
    width: 100%;
    height: auto;
    padding: 15px 30px;
    border-radius: 25px;
    border: 1px solid black;
    background: transparent;
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .formInput::placeholder {
    opacity: 0;
    visibility: hidden;
    color: transparent;
  }

  .formInput:focus {
    outline: none;
    border: 1.5px solid black;
  }

  .formInput:focus ~ .formLabel {
    top: -8px;
    left: 24px;
    z-index: 5;
    font-size: 12px;
    font-weight: 400;
    color: black;
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .formInput:not(:placeholder-shown).formInput:not(:focus) ~ .formLabel {
    top: -8px;
    left: 24px;
    z-index: 9;
    font-size: 14px;
    font-weight: 500;
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  &.selectFloating {
    .formLabel {
      z-index: 0;
      background-color: #e3d5ff;
    }
    .demoMain {
      position: relative;
      z-index: 1;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      top: 0;
      left: 0;
      resize: none;
      width: 100%;
      height: 100%;
      min-height: 34px;
      max-height: max-content !important;
      border-radius: 25px;
      border: 1px solid black;
      color: gray;
      background: transparent;
      /* padding: 0 30px; */
      appearance: none;
      -webkit-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }

    .floatingFormLabel {
      position: absolute;
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      top: -7px;
      left: 24px;
      z-index: 5;
      font-size: 12px;
      font-weight: 400;
      padding: 0 4px;
      color: black;
      background-color: #e3d5ff;
      -webkit-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    select option {
      color: black;
    }
    .demoClass__control {
      background-color: transparent !important;
      border: none;
      /* position: absolute; */
      width: 100%;
      height: 100%;
      box-shadow: none;
    }
    .demoClass__control .demoClass__placeholder {
      opacity: 0;
      visibility: hidden;
      color: transparent;
    }
    .demoClass__menu {
      position: absolute;
      z-index: 9;
    }
    .demoClass__option {
      background-color: transparent;
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      color: black;
      cursor: pointer;
      -webkit-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: white;
        color: black;
      }
    }
    .demoClass__value-container {
      padding-left: 10px;
    }
    .demoClass__single-value {
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      color: black;
      margin: 0;
      padding: 15px 20px 15px 30px;
    }
    .demoClass__indicator-separator {
      display: none;
    }
  }

  .paswordIconWrap {
    width: 21px;
    height: 20px;
    display: inline-block;
    position: absolute;
    cursor: pointer;
    z-index: 444;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto 0;

    svg {
      height: 100%;
      circle {
        stroke: black;
      }
      path {
        stroke: black;
      }
    }
  }

  @media only screen and (${device.xl}) {
    height: 46px;

    .formInput {
      padding: 14px 28px;
    }
  }
  @media only screen and (${device.md}) {
    .formGroup {
      height: 44px;
    }

    .formInput {
      padding: 13px 26px;
    }
  }
  @media only screen and (${device.xs}) {
    height: 42px;

    .formLabel {
      font-size: 14px;
      top: 13px;
    }
    .formInput {
      padding: 12px 22px;
    }
  }
`;
