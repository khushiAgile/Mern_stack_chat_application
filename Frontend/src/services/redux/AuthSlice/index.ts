import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import apiInstance from 'services/api';

import { LocalStorageKeys } from 'utils/constants';

import { IUserData } from './types';

export interface IAuthSlice {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: IUserData;
  isSuperAdmin?: boolean;
}

const initialState: IAuthSlice = {
  isLoading: false,
  isLoggedIn: false,
  userData: {} as IUserData
};

// Reducer
const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    loaderChange: (state, payload: PayloadAction<boolean>) => {
      state.isLoading = payload.payload;
    },
    authSuccess: (state, action: PayloadAction<{ data: IUserData }>) => {
      apiInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.data.accessToken}`;
      localStorage.setItem(
        LocalStorageKeys.authToken,
        JSON.stringify(action.payload.data.accessToken)
      );
      localStorage.setItem(LocalStorageKeys.user, JSON.stringify(action.payload.data));

      state.userData = action.payload.data;
      state.isLoggedIn = true;
    },
    authFail: (state) => {
      delete apiInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem(LocalStorageKeys.authToken);
      localStorage.removeItem(LocalStorageKeys.user);

      state.userData = {} as IUserData;
      state.isLoggedIn = false;
    }
  }
});

export const { loaderChange, authFail, authSuccess } = loginSlice.actions;
export default loginSlice.reducer;
