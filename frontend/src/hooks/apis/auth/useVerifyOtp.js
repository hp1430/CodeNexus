import { otpVerificationRequest } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useVerifyOtp = () => {
  const {
    isPending,
    error,
    isSuccess,
    mutateAsync: verifyOtpMutation,
  } = useMutation({
    mutationFn: otpVerificationRequest,
    onSuccess: (data) => {
      console.log('OTP verification successful: ', data);
      toast.success('OTP verification successful', {
        description: 'You are now logged in',
      });
    },
    onError: (error) => {
      console.log('OTP verification failed: ', error);
      toast.error('OTP verification failed', {
        description: 'Please try again',
      });
    },
  });
  return {
    isPending,
    error,
    isSuccess,
    verifyOtpMutation,
  };
};
