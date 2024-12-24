import { Wrapper } from './style';

import { useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ChatSocketContext } from 'components/chat/SocketContext';
import Avatar from 'components/common/Avatar';
import Button from 'components/common/Button';
import { RenderTextInput } from 'components/common/FormField';
import CommonModal from 'components/common/Modal/commonModal';

import { IReadMassageReq } from 'services/api/chat/types';
import {
  chatQueryKeys,
  useGetChatMessages,
  useGetChatRoomDetails,
  useReadMessage
} from 'services/hooks/chat';
import { useAppSelector } from 'services/redux/store';

import { SocketEndPoints } from 'utils/constants';

import UserDetail from '../UserDetail';

interface IFormValues {
  message: string;
}

const MessageView: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<IFormValues>();
  const queryClient = useQueryClient();

  const { userData } = useAppSelector((state) => state.auth); // Get logged in user data

  const { activeChat, userSendMessage, blockUserEvent, socket } = useContext(ChatSocketContext);

  const { data: chatRoomDetails } = useGetChatRoomDetails(activeChat ?? ''); // Get chat room details
  const { data: chatMessages } = useGetChatMessages(activeChat ?? ''); // Get chat messages
  const { mutate: readMessageMutate } = useReadMessage(); // Read message

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (!activeChat || !userData._id) return;
    handleReadMessageEvent(); // Read message

    if (!socket) return;
    // When receive message
    socket.current.on(SocketEndPoints.receiveMessage, () => {
      handleReadMessageEvent();
    });
  }, [activeChat, userData._id]);

  const handleReadMessageEvent = () => {
    const data: IReadMassageReq = {
      conversationId: activeChat ?? '',
      userId: userData._id
    };
    // Read message
    readMessageMutate(data, {
      onSuccess: () => {
        // Update chat room list
        queryClient.setQueriesData({ queryKey: chatQueryKeys.userChatList }, (oldData: any) => {
          return oldData.map((item: any) => {
            if (item._id === activeChat) {
              return {
                ...item,
                unreadMessageCount: 0
              };
            }
            return item;
          });
        });
      }
    });
  };

  const handleOnSubmit = (data: IFormValues) => {
    if (!activeChat) return;

    const value = {
      messageText: data.message,
      conversationId: activeChat,
      userId: userData._id
    };
    userSendMessage(value);

    reset();
  };

  // Block user handler
  const blockUserHandler = () => {
    blockUserEvent({
      userId: userData._id,
      conversationId: activeChat
    });
  };

  return (
    <Wrapper>
      {chatRoomDetails && (
        <>
          {/* ----------------------- message header ----------------------- */}
          <div className="message-header">
            <Avatar
              size={50}
              initials={
                chatRoomDetails?.conversationName
                  ? chatRoomDetails?.conversationName?.charAt(0)
                  : chatRoomDetails?.otherUser?.[0]?.firstName?.charAt(0)
              }
              onClick={() => setOpenModal(true)}
            />
            <div className="info">
              <h3>
                {chatRoomDetails?.conversationName
                  ? chatRoomDetails?.conversationName
                  : chatRoomDetails?.otherUser?.[0]?.firstName +
                    ' ' +
                    chatRoomDetails?.otherUser?.[0]?.lastName}
              </h3>
            </div>

            {!chatRoomDetails?.isGroupChat && (
              <>
                {chatRoomDetails?.isBlocked ? (
                  chatRoomDetails?.blockedBy?._id === userData._id && (
                    <Button
                      buttonClass="block-user"
                      variant="secondary"
                      type="button"
                      onClick={blockUserHandler}
                    >
                      Unblock user
                    </Button>
                  )
                ) : (
                  <Button
                    buttonClass="block-user"
                    variant="secondary"
                    type="button"
                    onClick={blockUserHandler}
                  >
                    Block user
                  </Button>
                )}
              </>
            )}
          </div>

          {/* ----------------------- message body ----------------------- */}
          <div className="message-body">
            {chatMessages?.length > 0 &&
              chatMessages?.map((message: any) => (
                <React.Fragment key={message._id}>
                  <div
                    className={`message ${
                      message?.senderDetail?._id !== userData._id ? 'receiver' : 'sender'
                    } `}
                  >
                    {message?.messageText}{' '}
                  </div>
                  <span
                    className={`userName ${
                      message?.senderDetail?._id !== userData._id ? 'receiver' : 'sender'
                    }`}
                  >
                    {message?.senderDetail?.firstName
                      .concat(' ')
                      .concat(message?.senderDetail?.lastName)}
                  </span>
                </React.Fragment>
              ))}
          </div>

          {chatRoomDetails.isBlocked && (
            <div className="message-blocked">
              {chatRoomDetails?.blockedBy?._id === userData._id
                ? 'You have blocked this user'
                : 'You have been blocked by this user'}
            </div>
          )}

          {/* ----------------------- message footer ----------------------- */}
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="formGroup">
              <RenderTextInput labelName="" register={register('message')} type="text" />
              <Button variant="primary" type="submit" disabled={chatRoomDetails?.isBlocked}>
                Send
              </Button>
            </div>
          </form>
        </>
      )}

      {openModal && (
        <CommonModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={
            chatRoomDetails?.conversationName
              ? chatRoomDetails?.conversationName
              : chatRoomDetails?.otherUser?.[0]?.firstName +
                ' ' +
                chatRoomDetails?.otherUser?.[0]?.lastName
          }
        >
          <UserDetail data={chatRoomDetails ?? null} />
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default MessageView;
