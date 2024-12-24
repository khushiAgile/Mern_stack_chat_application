import { UserListContainer } from './style';

import React, { useContext, useState } from 'react';

import { ChatSocketContext } from 'components/chat/SocketContext';
import Avatar from 'components/common/Avatar';
import Button from 'components/common/Button';
import CommonModal from 'components/common/Modal/commonModal';

import { IRoomListRes } from 'services/api/chat/types';
import { useGetChatRoomList } from 'services/hooks/chat';

import CreateUser from '../CreateUser';

const UserlistView: React.FC = () => {
  const { setActiveChat } = useContext(ChatSocketContext);

  const { data: chatRoomList } = useGetChatRoomList();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="form-container">
      <div>
        <Button variant="primary" type="button" onClick={() => setIsOpen(true)}>
          Create User
        </Button>
      </div>
      <UserListContainer>
        {(chatRoomList || [])?.length > 0 ? (
          chatRoomList?.map((room: IRoomListRes) => (
            <div className="userList" key={room._id} onClick={() => setActiveChat(room._id)}>
              <Avatar
                size={30}
                initials={
                  room.conversationName
                    ? room.conversationName?.charAt(0)
                    : room.otherUser?.firstName?.charAt(0)
                }
              />
              <div className="info">
                <span className="title">
                  {room.conversationName
                    ? room.conversationName
                    : room.otherUser?.firstName.concat(' ').concat(room.otherUser?.lastName)}
                </span>
                <span className="lastMessage">{room?.lastMessage?.messageText}</span>
              </div>
              <span className="dateTime">
                {room?.unreadMessageCount !== 0 && (
                  <span className="unreadCount">{room?.unreadMessageCount}</span>
                )}
                {room?.lastMessage?.createdAt
                  ? new Date(room?.lastMessage?.createdAt).toLocaleString()
                  : new Date(room.joinedAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <div>Not found</div>
        )}
      </UserListContainer>

      {isOpen && (
        <CommonModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Chat">
          <CreateUser setIsOpen={setIsOpen} />
        </CommonModal>
      )}
    </div>
  );
};

export default UserlistView;
