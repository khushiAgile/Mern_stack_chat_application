import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: blanchedalmond;
  /* header must be sticky */
  position: sticky;
  top: 0;
  z-index: 999;

  .left {
    display: flex;
    h2 {
      margin-right: 20px;
    }
    ul {
      display: flex;
      gap: 20px;
    }
  }

  .right {
    button {
      width: 80px;
    }
  }
`;
