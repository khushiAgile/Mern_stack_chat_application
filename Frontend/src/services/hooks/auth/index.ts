import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { authAPI } from 'services/api/auth';

export const authQueryKeys = {
  signIn: ['sign-in'],
  signUp: ['sign-up']
};

export const useSignIn = () => {
  return useMutation({
    mutationKey: authQueryKeys.signIn,
    mutationFn: authAPI.signIn,
    onError: (err: any) => {
      toast.error(err?.message);
    }
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: authQueryKeys.signUp,
    mutationFn: authAPI.signUp,
    onError: (err: any) => {
      toast.error(err?.message);
    }
  });
};
