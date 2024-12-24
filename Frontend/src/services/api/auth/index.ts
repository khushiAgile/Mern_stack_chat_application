import { authSuccess } from 'services/redux/AuthSlice';
import { store } from 'services/redux/store';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';
import { appLoader } from 'utils/functions';

import apiInstance from '..';
import { ISignInReq, ISignInRes, ISignUpReq } from './types';

export const authAPI = {
  // SignIn
  async signIn(data: ISignInReq): Promise<IApiSuccess<ISignInRes>> {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.auth.signIn, data)
      .then((response) => {
        store.dispatch(authSuccess(response));
        return response;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  },

  // Signup
  async signUp(data: ISignUpReq): Promise<IApiSuccess<Record<string, string>>> {
    appLoader(true);
    return apiInstance
      .post(ApiEndPoints.auth.signUp, data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
      .finally(() => appLoader(false));
  }
};
