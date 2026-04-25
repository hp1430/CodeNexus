import { useJoinRoom } from '@/hooks/apis/room/useJoinRoom';
import { OTPDialog } from '../otpDialog/OTPDialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JoinRoomDialogContainer = ({ open, onOpenChange }) => {
  const [otpForm, setOtpForm] = useState({ otp: '' });
  const [validationError, setValidationError] = useState(null);

  const { isPending, error, isSuccess, joinRoomMutation } = useJoinRoom();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log('Joining room with code:', otpForm.otp);
      if (!otpForm.otp) {
        console.log('Room code is required');
        setValidationError({ message: 'Room code is required' });
        return;
      }
      const response = await joinRoomMutation({ roomId: otpForm.otp });
      const roomId = response?.data?.roomId;
      console.log('Joined room successfully: ', response);
      navigate(`/playground/${roomId}`);
    } catch (err) {
      console.error('Error joining room:', err);
      if (
        err.response &&
        (err.response.status === 404 ||
          err.response.status === 400 ||
          err.response.status === 500)
      ) {
        console.log(
          'Room not found. Please check the room code and try again.'
        );
        setValidationError({
          message: 'Room not found. Please check the room code and try again.',
        });
        return;
      }
      if (err.response && err.response.status === 401) {
        console.log('User not authenticated. Please log in to join a room.');
        setValidationError({
          message: 'User not authenticated. Please log in to join a room.',
        });
        return;
      }
    }
  }

  return (
    <OTPDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Join Room"
      description="Enter the room code to join an existing coding session."
      validationError={validationError}
      onSubmit={handleSubmit}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
      otpForm={otpForm}
      setOtpForm={setOtpForm}
      label="Room Code"
    />
  );
};
