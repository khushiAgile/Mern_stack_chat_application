import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Button from 'components/common/Button';
import { RenderSelectInput, RenderTextInput } from 'components/common/FormField';

import { ICreateRoomReq } from 'services/api/chat/types';
import { chatQueryKeys, useCreateChat } from 'services/hooks/chat';
import { useUserList } from 'services/hooks/user';

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateUser: React.FC<IProps> = ({ setIsOpen }) => {
  const { register, handleSubmit, control, reset } = useForm();
  const queryClient = useQueryClient();

  const { userData } = useSelector((state: any) => state.auth);

  const { data } = useUserList(); // User list

  const { mutate: createChatMutate } = useCreateChat(); // Use hook for create chat

  const userListOption = data
    ?.filter((user: any) => {
      return user._id !== userData._id;
    })
    .map((user: any) => ({
      value: user._id,
      label: `${user.firstName} ${user.lastName}`
    }));

  const onSubmit = (data: any) => {
    if (!data.user) return;

    const values: ICreateRoomReq = {
      userId: data.user?.map((item: { value: string }) => item.value),
      creatorId: userData._id,
      isGroup: data.user?.length > 1 || false,
      groupName: data.groupName ?? ''
    };

    createChatMutate(values, {
      onSuccess: (res) => {
        console.log('res: ', res);
        // Update chat room list
        queryClient.invalidateQueries({ queryKey: chatQueryKeys.userChatList });

        // Reset form
        reset();

        // Close modal
        setIsOpen(false);

        toast.success('Chat created successfully');
      }
    });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2">
        <RenderSelectInput
          placeholder="Select User"
          labelName="Select user"
          control={control}
          containerClasses="selectFloating"
          register={register('user')}
          options={userListOption ?? []}
          isMulti
          isSearchable
        />

        <RenderTextInput
          register={register('groupName')}
          type="text"
          placeholder="Group Name"
          containerClasses="selectFloating"
          labelName="Group Name"
        />

        <Button variant="primary" type="submit">
          Add Chat
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
