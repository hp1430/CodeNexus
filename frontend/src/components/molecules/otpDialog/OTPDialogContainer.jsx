import { useState } from 'react';
import { OTPDialog } from './otpDialog';

export const OTPDialogContainer = ({ open, onOpenChange }) => {
  const [otpForm, setOtpForm] = useState({ otp: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP Entered:', otpForm.otp);
  };

  return (
    <OTPDialog
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      otpForm={otpForm}
      setOtpForm={setOtpForm}
      validationError={null}
      error={null}
      isSuccess={false}
      isPending={false}
    />
  );
};
