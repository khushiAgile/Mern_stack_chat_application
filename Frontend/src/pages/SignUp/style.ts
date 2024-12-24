import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3d5ff;

  h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;

    form {
      width: 500px;
    }
  }
`;
