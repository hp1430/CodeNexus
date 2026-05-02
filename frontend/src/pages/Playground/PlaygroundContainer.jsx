import { useParams } from 'react-router-dom';
import { Playground } from './Playground';
import { useEffect, useRef, useState } from 'react';
import { useJoinRoom } from '@/hooks/apis/room/useJoinRoom';
import { socket } from '@/configs/socketConfig';
import { playgroundSocketHandler } from '@/lib/playgroundSocketHandler';
import useUserStore from '@/hooks/store/useUserStore';
import { UserCheck2Icon } from 'lucide-react';

export const PlaygroundContainer = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useUserStore();
  const { joinRoomMutation } = useJoinRoom();

  const editorRef = useRef(null);
  const decorationRef = useRef({});
  const monacoRef = useRef(null);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        console.log('Attempting to join room with ID: ', roomId);
        const response = await joinRoomMutation({ roomId });
        console.log('Room data:', response.data);
        setCode((prevCode) => prevCode || response.data.code);
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
      socket.emit('join-room', {
        roomId,
        user: { id: user._id, name: user.name },
      });
      console.log(
        'value of monacoInstance in playgroundContainer is: ',
        monacoRef
      );
      playgroundSocketHandler(
        socket,
        roomId,
        setCode,
        setUsers,
        editorRef,
        decorationRef,
        monacoRef
      );
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, [roomId, user]);

  function handleCodeChange(newCode) {
    setCode(newCode);
    socket.emit('code-change', { roomId, code: newCode });
  }
  return (
    <Playground
      roomId={roomId}
      code={code}
      setCode={handleCodeChange}
      users={users}
      editorRef={editorRef}
      monacoRef={monacoRef}
    />
  );
};
