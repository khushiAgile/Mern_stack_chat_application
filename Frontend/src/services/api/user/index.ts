import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IUser } from './type';

export const userAPI = {
  // Get User List
  getUserList(): Promise<IUser[]> {
    return apiInstance
      .get(ApiEndPoints.user.userList)
      .then((response) => response.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  // Get User Details
  getUserDetails(): Promise<IUser> {
    return apiInstance
      .get(ApiEndPoints.user.userList)
      .then((response) => response.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
