import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 76px);

  .message-header {
    width: 100%;
    display: flex;
    padding: 5px 5px;
    justify-content: start;
    align-items: center;
    gap: 10px;
    background-color: rebeccapurple;
    .profile {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      background-color: #ccc;
      cursor: pointer;
    }
    .info {
      width: calc(100% - 150px);
      h3 {
        font-size: 20px;
        font-weight: 500;
        color: white;
      }
    }
    .block-user {
      width: 150px;
    }
  }
  .message-body {
    padding: 15px;
    width: 100%;
    height: calc(100% - 145px);
    overflow: hidden auto;
    display: flex;
    gap: 12px;
    flex-direction: column-reverse;

    .message {
      width: 70%;
      min-width: 160px;
      max-width: max-content;

      &.sender {
        text-align: right;
        margin-left: auto;
        background-color: #e3d5ff;
        border-radius: 10px 10px 0 10px;
        padding: 8px 12px 8px 20px;
      }

      &.receiver {
        background-color: #c6aaff;
        border-radius: 10px 10px 10px 0;
        padding: 8px 20px 8px 12px;
      }
    }
    .userName {
      color: #ccc;
      font-size: 14px;
      margin-bottom: -10px;

      &.sender {
        text-align: right;
        margin-left: auto;
      }

      &.receiver {
        margin-right: auto;
      }
    }
  }
  .message-blocked {
    width: 100%;
    text-align: center;
  }
  .formGroup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    button {
      width: 180px;
      height: 100%;
    }
  }
`;
