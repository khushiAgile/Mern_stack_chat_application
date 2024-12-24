import styled from 'styled-components';

export const Wrapper = styled.div`
  /* Style for the overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  z-index: 99999; /* Ensure it's above other content */

  .loader {
    position: fixed;
    top: 48%;
    left: 48%;
    width: 14.4px;
    height: 14.4px;
    border-radius: 14.4px;
    box-shadow:
      36px 0px 0 0 rgba(0, 0, 0, 0.2),
      29.2px 21.2px 0 0 rgba(0, 0, 0, 0.4),
      11.16px 34.2px 0 0 rgba(0, 0, 0, 0.6),
      -11.16px 34.2px 0 0 rgba(0, 0, 0, 0.8),
      -29.2px 21.2px 0 0 #000000;
    animation: spinner-b87k6z 1s infinite linear;
  }
  @keyframes spinner-b87k6z {
    to {
      transform: rotate(360deg);
    }
  }
`;
