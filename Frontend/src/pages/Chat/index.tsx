import { Wrapper } from './style';

import { createContext, useContext, useEffect } from 'react';

import { ChatSocketContext } from 'components/chat/SocketContext';
import Meta from 'components/common/Meta';

import { useAppSelector } from 'services/redux/store';

import MessageView from './component/MessageView';
import UserlistView from './component/UserlistView';

interface IContext {
  conversationId: string;
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
}

export const ConversationContext = createContext<IContext>({
  conversationId: '',
  setConversationId: () => {}
});

const Chat = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const { userConnect } = useContext(ChatSocketContext);

  useEffect(() => {
    if (!userData?._id) return;

    userConnect({ userId: userData?._id });
  }, [userConnect, userData?._id]);

  return (
    <Wrapper>
      <Meta title="Chat App - Chat" />
      <div className="main-container">
        <div className="chat-users-container">
          <UserlistView />
        </div>
        <div className="chat-massage-container">
          <MessageView />
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;
