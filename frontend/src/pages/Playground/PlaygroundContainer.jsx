import { useParams } from 'react-router-dom';
import { Playground } from './Playground';

export const PlaygroundContainer = () => {
  const { roomId } = useParams();
  return <Playground roomId={roomId} />;
};
