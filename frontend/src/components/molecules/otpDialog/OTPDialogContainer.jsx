import { useEffect, useState } from 'react';
import { useVerifyOtp } from '@/hooks/apis/auth/useVerifyOtp';
import { OTPDialog } from './OTPDialog';

export const OTPDialogContainer = ({ open, onOpenChange }) => {
  const [otpForm, setOtpForm] = useState({ otp: '' });
  const [validationError, setValidationError] = useState(null);

  const { isPending, error, isSuccess, verifyOtpMutation } = useVerifyOtp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('signupEmail');
    if (!email) {
      setValidationError({ message: 'No email found for OTP verification' });
      return;
    }
    if (!otpForm.otp) {
      console.log('OTP is required');
      setValidationError({ message: 'OTP is required' });
      return;
    }
    if (otpForm.otp.length !== 6) {
      console.log('OTP must be 6 digits');
      setValidationError({ message: 'OTP must be 6 digits' });
      return;
    }
    setValidationError(null);
    await verifyOtpMutation({ otp: otpForm.otp, email: email });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    }
  }, [isSuccess, onOpenChange]);

  return (
    <OTPDialog
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      otpForm={otpForm}
      setOtpForm={setOtpForm}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
      title="Enter OTP"
      description="Please enter the 6-digit OTP sent to your email to complete the signup process."
      label="OTP"
    />
  );
};
