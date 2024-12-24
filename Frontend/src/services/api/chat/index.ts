import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IChatRoomDetailRes, ICreateRoomReq, IReadMassageReq, IRoomListRes } from './types';

export const chatAPI = {
  // Create chat room
  createChatRoom(data: ICreateRoomReq): Promise<IApiSuccess<Record<string, string>>> {
    return apiInstance
      .post(ApiEndPoints.chat.createChat, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // Get chat room list
  getChatRoomList(): Promise<IRoomListRes[]> {
    return apiInstance
      .get(ApiEndPoints.chat.chatList)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  // Get chat room details
  getChatRoomDetails({ conversationId }: { conversationId: string }): Promise<IChatRoomDetailRes> {
    return apiInstance
      .get(`${ApiEndPoints.chat.conversationDetail}?conversationId=${conversationId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // Get chat room messages
  getChatRoomMessages({ conversationId }: { conversationId: string }): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.chat.conversationDetail}?conversationId=${conversationId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // Create message
  createMessage(data: any): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.chat.createMessage, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // message list
  getMessageList(data: { conversationId: string }): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.chat.messageList}?conversationId=${data.conversationId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // read message
  readMessage(data: IReadMassageReq): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.chat.readMassage, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
