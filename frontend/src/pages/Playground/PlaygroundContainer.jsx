import { useParams } from 'react-router-dom';
import { Playground } from './Playground';
import { useEffect, useRef, useState } from 'react';
import { useJoinRoom } from '@/hooks/apis/room/useJoinRoom';
import { socket } from '@/configs/socketConfig';
import { playgroundSocketHandler } from '@/lib/playgroundSocketHandler';
import useUserStore from '@/hooks/store/useUserStore';
import { usePlaygroundStore } from '@/hooks/store/usePlaygroundStore';

export const PlaygroundContainer = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const { user } = useUserStore();
  const { joinRoomMutation } = useJoinRoom();
  const { setSocket, setUsers } = usePlaygroundStore();

  const editorRef = useRef(null);
  const decorationRef = useRef({
    cursor: {},
    selection: {},
  });
  const monacoRef = useRef(null);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const response = await joinRoomMutation({ roomId });
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
      setSocket(socket);
      socket.emit('join-room', {
        roomId,
        user: { id: user._id, name: user.name },
      });

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
      setSocket(null);
      socket.disconnect();
    };
  }, [roomId, user, setSocket, setUsers]);

  function handleCodeChange(newCode) {
    setCode(newCode);
    //socket.emit('code-change', { roomId, code: newCode });
  }
  return (
    <Playground
      roomId={roomId}
      code={code}
      setCode={handleCodeChange}
      editorRef={editorRef}
      monacoRef={monacoRef}
    />
  );
};
