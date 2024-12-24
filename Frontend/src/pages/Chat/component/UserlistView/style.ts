import styled from 'styled-components';

export const UserListContainer = styled.div`
  margin-top: 15px;

  .userList {
    cursor: pointer;
    background: cornsilk;
    padding: 10px 3px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;

    .userAvatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      background-color: #ccc;
    }
    .info {
      width: calc(100% - 150px);
      display: flex;
      flex-direction: column;
      gap: 4px;
      .title {
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
      }
      .lastMessage {
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: gray;
      }
    }
    .dateTime {
      .unreadCount {
        background-color: rebeccapurple;
        border-radius: 50%;
        padding: 3px 5px;
        color: white;
        margin-right: 5px;
      }
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      color: #ccc;
      text-align: end;
    }
  }
`;
