import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: aliceblue;
  width: 100%;
  min-height: 80vh;

  .main-container {
    display: flex;
    height: calc(100vh - 76px);
    width: 100%;

    .chat-users-container {
      width: 30%;
      padding: 10px;
      border-right: 1px solid #ccc;
      overflow-y: scroll;

      .form-container {
        form {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: row;
          gap: 3px;
          button {
            width: 100px;
          }
        }
      }
    }

    .chat-massage-container {
      width: 70%;
      padding: 10px;
    }
  }
`;
