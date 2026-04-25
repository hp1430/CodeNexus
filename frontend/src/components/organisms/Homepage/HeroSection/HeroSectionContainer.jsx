import { useCreateRoom } from '@/hooks/apis/room/useCreateRoom';
import Hero from './HeroSection';

export const HeroSectionContainer = ({ setLoginDialogOpen }) => {
  const { isPending: isCreatingRoom, createRoomMutation } = useCreateRoom();
  async function createRoom() {
    console.log('Creating room...');
    try {
      const response = await createRoomMutation();
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
