import { loginRequest } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useLogin = () => {
  const {
    isPending,
    error,
    isSuccess,
    mutateAsync: loginMutation,
  } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      console.log('Logged in sucessfully ', response);

      const userObject = JSON.stringify(response.data);

      localStorage.setItem('user', userObject);
      localStorage.setItem('token', response.data.token);

      toast.success('Successfully logged in', {
        description: 'You have successfully logged in',
      });
    },
    onError: (error) => {
      console.log('Error while logging in ', error);

      const message =
        error?.response?.data?.message || error.message || 'Login failed';

      toast.error('Failed to login', {
        description: message,
      });
    },
  });
  return {
    isPending,
    error,
    isSuccess,
    loginMutation,
  };
};
