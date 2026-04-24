import { joinRoomRequest } from '@/apis/room';
import { useMutation } from '@tanstack/react-query';

export const useJoinRoom = () => {
  const {
    isPending,
    error,
    isSuccess,
    mutateAsync: joinRoomMutation,
  } = useMutation({
    mutationFn: joinRoomRequest,
    onSuccess: (response) => {
      console.log('Room joined successfully ', response);
    },
    onError: (error) => {
      console.log('Error while joining room ', error);
    },
  });

  return {
    isPending,
    error,
    isSuccess,
    joinRoomMutation,
  };
};
