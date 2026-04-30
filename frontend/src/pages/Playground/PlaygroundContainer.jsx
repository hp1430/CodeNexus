import { useParams } from 'react-router-dom';
import { Playground } from './Playground';
import { useEffect, useState } from 'react';
import { useJoinRoom } from '@/hooks/apis/room/useJoinRoom';
import { socket } from '@/configs/socketConfig';

export const PlaygroundContainer = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const { joinRoomMutation } = useJoinRoom();

  useEffect(() => {
    const loadRoom = async () => {
      try {
        console.log('Attempting to join room with ID: ', roomId);
        const response = await joinRoomMutation({ roomId });
        console.log('Room data:', response.data);
        setCode(response.data.code);
      } catch (err) {
        console.error(err);
      }
    };

    loadRoom();
  }, [roomId, joinRoomMutation]);

  useEffect(() => {
    if (!roomId) return;

    socket.connect();

    socket.on('connect', () => {
      socket.emit('join-room', { roomId });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, [roomId]);
  return <Playground roomId={roomId} code={code} setCode={setCode} />;
};
