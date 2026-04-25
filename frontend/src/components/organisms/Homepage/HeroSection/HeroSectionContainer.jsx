import { useCreateRoom } from '@/hooks/apis/room/useCreateRoom';
import Hero from './HeroSection';
import { useNavigate } from 'react-router-dom';

export const HeroSectionContainer = ({ setLoginDialogOpen }) => {
  const { isPending: isCreatingRoom, createRoomMutation } = useCreateRoom();
  const navigate = useNavigate();
  async function createRoom() {
    console.log('Creating room...');
    try {
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
  return <Hero onCreateRoom={createRoom} isCreatingRoom={isCreatingRoom} />;
};
