import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { chatAPI } from 'services/api/chat';

import useFetch from '..';

export const chatQueryKeys = {
  userChatList: ['chat-list'],
  createChat: ['create-chat'],
  conversationDetail: (conversationId: string) => [`conversation-detail-${conversationId}`],
  createMassage: ['create-massage'],
  messageList: (conversationId: string) => [`message-list-${conversationId}`],
  readMassage: ['read-massage']
};

// Use hook for create chat
export const useCreateChat = () => {
  return useMutation(chatQueryKeys.createChat, chatAPI.createChatRoom, {
    onError: (error: any) => {
      toast.error(error?.message);
    }
  });
};

// Use hook for get chat room list
export const useGetChatRoomList = () => {
  return useFetch({
    queryKey: chatQueryKeys.userChatList,
    apiFunction: () => chatAPI.getChatRoomList(),
    queryOptions: { staleTime: Infinity, retry: false }
  });
};

// Use hook for get chat room details
export const useGetChatRoomDetails = (conversationId: string) => {
  return useFetch({
    queryKey: chatQueryKeys.conversationDetail(conversationId),
    apiFunction: () => chatAPI.getChatRoomDetails({ conversationId }),
    queryOptions: { staleTime: Infinity, enabled: !!conversationId, retry: false }
  });
};

// Use hook for create messages
export const useCreateChatMessage = () => {
  return useMutation(chatQueryKeys.createMassage, chatAPI.createMessage, {
    onError: (error: any) => {
      toast.error(error?.message);
    }
  });
};

// Use hook for get chat room messages
export const useGetChatMessages = (conversationId: string) => {
  return useFetch({
    queryKey: chatQueryKeys.messageList(conversationId),
    apiFunction: () => chatAPI.getMessageList({ conversationId }),
    queryOptions: { staleTime: Infinity, enabled: !!conversationId, retry: false }
  });
};

// Use hook for read messages
export const useReadMessage = () => {
  return useMutation(chatQueryKeys.readMassage, chatAPI.readMessage, {
    onError: (error: any) => {
      toast.error(error?.message);
    }
  });
};
