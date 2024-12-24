import { Store } from '@reduxjs/toolkit';

import { setAxiosInterceptor } from 'services/api';
import { authFail, authSuccess, loaderChange } from 'services/redux/AuthSlice';
import { store } from 'services/redux/store';

import { LocalStorageKeys } from './constants';

//To concate the path for the public folder
export const toAbsoluteUrl = (pathname: string) => window.location.origin + pathname;

/**
 * The function `setupAxios` retrieves user and token data from local storage, dispatches an
 * authentication success action if the token is present, and sets an Axios interceptor.
 * @param {Store} store - The `store` parameter is an instance of the Redux store. It is used to
 * dispatch actions and manage the application state.
 */
export const setupAxios = (store: Store) => {
  const userStorage = localStorage.getItem(LocalStorageKeys.user);
  const tokenStorage = localStorage.getItem(LocalStorageKeys.authToken);

  if (userStorage && tokenStorage) {
    const token = JSON.parse(tokenStorage);
    const userData = JSON.parse(userStorage);

    if (token) {
      const USER_DATA = { ...userData, authToken: token };
      store.dispatch(authSuccess({ data: USER_DATA }));
    } else {
      store.dispatch(authFail());
    }
  }

  // Set Axios Interceptor
  setAxiosInterceptor(store);
};

export const appLoader = (status: boolean) => store.dispatch(loaderChange(status));
