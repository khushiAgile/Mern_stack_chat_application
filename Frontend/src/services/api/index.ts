import { Store } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { authFail } from 'services/redux/AuthSlice';

import { API_BASE } from 'utils/constants';

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE
});

/**
 * The function sets up Axios interceptors to handle request and response errors and perform actions
 * based on the error status.
 * @param {Store} store - The `store` parameter is an instance of a Redux store. It is used to dispatch
 * actions to update the state of the application.
 */
export function setAxiosInterceptor(store: Store) {
  apiInstance.interceptors.request.use(
    (config) => {
      console.log('Starting Loading');
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // It's used to intercept all the axios api response
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (err) => {
      if (err.response) {
        if (err.response.status === 403) {
          store.dispatch(authFail());
          return Promise.reject(err);
        } else {
          return Promise.reject(err);
        }
      } else if (err.request) {
        return Promise.reject({
          response: {
            data: {
              message: 'Something went wrong, Please try again later!!!'
            }
          }
        });
      }
    }
  );
}

export default apiInstance;
