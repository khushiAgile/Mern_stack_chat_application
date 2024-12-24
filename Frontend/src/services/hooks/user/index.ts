import { userAPI } from 'services/api/user';

import useFetch from '..';

export const userQueryKey = {
  userList: ['user-list']
};

export const useUserList = () => {
  return useFetch({
    queryKey: userQueryKey.userList,
    apiFunction: () => userAPI.getUserList(),
    queryOptions: { staleTime: Infinity }
  });
};
