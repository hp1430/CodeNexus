import { createRoomRequest } from '@/apis/room';
import { useMutation } from '@tanstack/react-query';

export const useRoom = () => {
  const {
    isPending,
    error,
    isSuccess,
    mutateAsync: createRoomMutation,
  } = useMutation({
    mutationFn: createRoomRequest,
    onSuccess: (response) => {
      console.log('Room created suvvessfully ', response);
    },
    onError: (error) => {
      console.log('Error while creating room ', error);
    },
  });

  return {
    isPending,
    error,
    isSuccess,
    createRoomMutation,
  };
};
