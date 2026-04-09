import { signupRequest } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSignup = () => {
  const {
    isPending,
    error,
    isSuccess,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signupRequest,

    onSuccess: (data) => {
      console.log('Successfully signed up: ', data);

      toast.success('Successfully signed up', {
        description: 'You will be redirected to login page in a few seconds',
      });
    },

    onError: (error) => {
      console.log('Error signing up: ', error);

      const message =
        error?.response?.data?.message || error.message || 'Signup failed';

      toast.error('Failed to sign up', {
        description: message,
      });
    },
  });

  return {
    isPending,
    error,
    isSuccess,
    signupMutation,
  };
};
