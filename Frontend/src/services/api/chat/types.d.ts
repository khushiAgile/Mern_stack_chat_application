export interface ICreateRoomReq {
  creatorId: string;
  userId: string[];
  isGroup?: boolean;
  groupName?: string;
}

export interface IRoomListRes {
  _id: string;
  conversationName: string;
  isGroupChat: boolean;
  joinedAt: string;
  otherUser: IOtherUserDetail;
  message: string;
  createdAt: string;
  lastMessage: ILastMessage;
  unreadMessageCount: number;
}

interface ILastMessage {
  messageText: string;
  createdAt: string;
}

interface IOtherUserDetail {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface IReadMassageReq {
  conversationId: string;
  userId: string;
}

interface IChatRoomDetailRes {
  _id: string;
  createdBy: CreatedBy;
  isBlocked: boolean;
  isGroupChat: boolean;
  conversationName: string;
  joinedAt: string;
  otherUser: IOtherUserDetail[];
  lastMessage: ILastMessage;
  blockedBy: IBlockedBy;
}

interface IBlockedBy {
  _id: string;
  name: string;
}
interface CreatedBy {
  _id: string;
  name: string;
}
