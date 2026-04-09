import { loginRequest } from '@/apis/auth';
import useUserStore from '@/hooks/store/useUserStore';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useLogin = () => {
  const setAuth = useUserStore((state) => state.setAuth);

  const {
    isPending,
    error,
    isSuccess,
    mutateAsync: loginMutation,
  } = useMutation({
    mutationFn: loginRequest,

    onSuccess: (response) => {
      console.log('Logged in successfully ', response);

      const user = response.data;
      const token = response.data.token;

      // ✅ Zustand handles everything (including persistence)
      setAuth(user, token);

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
