// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;
export const SOCKET_BASE = import.meta.env.VITE_REACT_SOCKET_BASE;

// Local Storage Variables
export const LocalStorageKeys = {
  user: `user${APP_NAME}`,
  authToken: `authToken${APP_NAME}`
};

// Api Endpoint
export const ApiEndPoints = {
  auth: {
    signIn: `auth/login`,
    signUp: `auth/register`
  },
  user: {
    userList: `users/getAll`
  },
  chat: {
    chatList: `chat/userlist`,
    createChat: `chat/createRoom`,
    conversationDetail: `chat/conversationDetail`,
    createMessage: `chat/createMessage`,
    messageList: `chat/messageList`,
    readMassage: `chat/readMessage`
  }
};

// Socket Api Endpoint
export const SocketEndPoints = {
  connectUser: `user-connected`,
  sendMessage: `sendMessage`,
  receiveMessage: `receiveMessage`,
  blockUser: `blockUser`,
  conversationDetail: `conversationDetail`
};
