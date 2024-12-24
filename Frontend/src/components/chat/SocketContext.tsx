import { useQueryClient } from '@tanstack/react-query';
import React, {
  MutableRefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Socket, io } from 'socket.io-client';

import { chatQueryKeys } from 'services/hooks/chat';

import { SOCKET_BASE, SocketEndPoints } from 'utils/constants';

interface IProps {
  children?: React.ReactNode;
}

interface IContext {
  isUserConnected: boolean;
  setIsUserConnected: React.Dispatch<React.SetStateAction<boolean>>;
  activeChat: string | null;
  setActiveChat: React.Dispatch<React.SetStateAction<string | null>>;
  connectionErrorEvent: () => void;
  connectEvent: () => void;
  connectionEvent: () => void;
  disconnectionEvent: () => void;
  reconnectAttemptEvent: () => void;
  userConnect: (value: any) => void;
  userSendMessage: (value: any) => void;
  socket: MutableRefObject<Socket>;
  blockUserEvent: (value: any) => void;
}

export const ChatSocketContext = createContext<IContext>({
  isUserConnected: false,
  setIsUserConnected: () => {},
  activeChat: null,
  setActiveChat: () => {},
  connectionErrorEvent: () => {},
  connectEvent: () => {},
  connectionEvent: () => {},
  disconnectionEvent: () => {},
  reconnectAttemptEvent: () => {},
  userConnect: () => {},
  userSendMessage: () => {},
  socket: {} as MutableRefObject<Socket>,
  blockUserEvent: () => {}
});

const SocketContext: React.FC<IProps> = ({ children }) => {
  const socket = useRef<Socket>(io(SOCKET_BASE, { reconnection: true, autoConnect: false }));

  const queryClient = useQueryClient();

  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  // Connect socket server
  useEffect(() => {
    if (socket.current.connect().connected) return;
    connectionEvent();
    return () => {
      disconnectionSocketEvent();
    };
  }, [socket]); // eslint-disable-line

  useEffect(() => {
    receiveMessageEvent();
    conversationDetail();
  }, [socket]); // eslint-disable-line

  const connectionEvent = useCallback(() => {
    socket.current.on('connect', () => {});
  }, [socket]);

  const disconnectionEvent = useCallback(() => {
    socket.current.on('disconnect', () => {});
  }, [socket]);

  const disconnectionSocketEvent = useCallback(() => {
    socket.current.disconnect();
  }, [socket]);

  const connectionErrorEvent = useCallback(() => {
    return () => {
      socket.current.on('error', (error) => {
        return error;
      });
    };
  }, [socket]);

  const connectEvent = useCallback(() => {
    return () => {
      socket.current.on('connect_error', (error) => {
        console.error('Connection error:', error);
        // Attempt to reconnect or implement custom retry logic here
      });
    };
  }, [socket]);

  const reconnectAttemptEvent = useCallback(() => {
    return () => {
      socket.current.on('reconnect_attempt', (attemptNumber) => {
        console.log('Attempting to reconnect (attempt number:', attemptNumber, ')');
      });
    };
  }, [socket]);

  //   User Connect Event
  const userConnect = useCallback(
    (data: any) => {
      // Emit the 'connectUser' event with user data
      socket.current.emit(SocketEndPoints.connectUser, data, (connected: any) => {
        if (connected) {
          setIsUserConnected(true);
        }
      });
    },
    [socket]
  );

  // User send message event
  const userSendMessage = useCallback(
    (data: any) => {
      // Emit the 'connectUser' event with user data
      socket.current.emit(SocketEndPoints.sendMessage, data);
    },
    [socket]
  );

  // User receive message event
  const receiveMessageEvent = useCallback(() => {
    socket.current.on(SocketEndPoints.receiveMessage, (responseData: any) => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.userChatList }); // Invalidate user chat list query

      // Add receive massage in massage list
      queryClient.setQueriesData(
        {
          predicate: (query) => {
            return (query?.queryKey?.[0] as string)?.includes?.(
              chatQueryKeys.messageList(responseData?.conversationId)[0]
            );
          }
        },
        (response: any) => {
          return [responseData, ...(response || [])] as any;
        }
      );

      //  Call read message API and update unread message count when chat is open
    });
  }, [socket]); // eslint-disable-line

  // User block event
  const blockUserEvent = useCallback(
    (data: any) => {
      socket.current.emit(SocketEndPoints.blockUser, data, () => {});
    },
    [socket]
  );

  // User conversation detail
  const conversationDetail = useCallback(() => {
    socket.current.on(SocketEndPoints.conversationDetail, (responseData: any) => {
      queryClient.invalidateQueries(chatQueryKeys.conversationDetail(responseData._id));
    });
  }, [socket]);

  const context = useMemo(
    () => ({
      isUserConnected,
      setIsUserConnected,
      connectionErrorEvent,
      connectEvent,
      reconnectAttemptEvent,
      userConnect,
      activeChat,
      setActiveChat,
      userSendMessage,
      connectionEvent,
      disconnectionEvent,
      socket,
      blockUserEvent
    }),
    [
      isUserConnected,
      connectionErrorEvent,
      connectEvent,
      reconnectAttemptEvent,
      userConnect,
      activeChat,
      userSendMessage,
      connectionEvent,
      disconnectionEvent,
      blockUserEvent
    ]
  );
  return <ChatSocketContext.Provider value={context}>{children}</ChatSocketContext.Provider>;
};

export default SocketContext;
