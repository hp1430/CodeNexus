import { useCreateRoom } from '@/hooks/apis/room/useCreateRoom';
import Hero from './HeroSection';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/hooks/store/useUserStore';

export const HeroSectionContainer = ({
  setLoginDialogOpen,
  setJoinRoomDialogOpen,
}) => {
  const { isPending: isCreatingRoom, createRoomMutation } = useCreateRoom();
  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();
  async function createRoom() {
    console.log('Creating room...');
    try {
      if (!token) {
        console.log('User not authenticated. Please log in to create a room.');
        setLoginDialogOpen(true);
        return;
      }
      const response = await createRoomMutation();
      const roomId = response?.data?.roomId;
      navigate(`/playground/${roomId}`);
      console.log('Room created successfully: ', response);
    } catch (error) {
      console.error('Error creating room: ', error.response.status);
      if (error.response.status === 401) {
        setLoginDialogOpen(true);
      }
    }
  }

  async function handleJoinRoomClick() {
    if (!token) {
      console.log('User not authenticated. Please log in to join a room.');
      setLoginDialogOpen(true);
      return;
    }
    setJoinRoomDialogOpen(true);
  }
  return (
    <Hero
      onCreateRoom={createRoom}
      isCreatingRoom={isCreatingRoom}
      onJoinRoomClick={handleJoinRoomClick}
    />
  );
};
