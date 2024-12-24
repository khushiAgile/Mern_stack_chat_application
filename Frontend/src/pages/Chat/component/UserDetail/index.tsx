import { Wrapper } from './style';

import React from 'react';

import Avatar from 'components/common/Avatar';

import { IChatRoomDetailRes, IOtherUserDetail } from 'services/api/chat/types';
import { useAppSelector } from 'services/redux/store';

interface IProps {
  data: IChatRoomDetailRes | null;
}

const UserDetail: React.FC<IProps> = ({ data }) => {
  const { userData } = useAppSelector((state) => state.auth);
  return (
    <Wrapper>
      <Avatar
        size={100}
        initials={
          data?.conversationName
            ? data?.conversationName?.charAt(0)
            : data?.otherUser?.[0]?.firstName?.charAt(0)
        }
        imageUrl={data?.otherUser?.[0]?.profileImage}
      />
      <div className="userDetail">
        {data?.isGroupChat ? (
          <div>
            <span className="title">Group Name:</span>
            <p>{data?.conversationName}</p>
          </div>
        ) : (
          <>
            <span className="title">Name:</span>
            <p>
              {data?.otherUser?.[0]?.firstName} {data?.otherUser?.[0]?.lastName}{' '}
            </p>
          </>
        )}
        <span className="title">Joined At:</span>
        <p>{data?.joinedAt && new Date(data?.joinedAt).toDateString()}</p>

        {data?.isGroupChat && (
          <>
            <span className="title">Members :</span>
            {data?.otherUser?.map((user: IOtherUserDetail) => (
              <p key={user._id}>
                {user.firstName} {user.lastName}
              </p>
            ))}
          </>
        )}

        {data?.isBlocked && (
          <p>Blocked By: {data?.blockedBy._id === userData._id ? 'You' : data?.blockedBy?.name}</p>
        )}
      </div>
    </Wrapper>
  );
};

export default UserDetail;
